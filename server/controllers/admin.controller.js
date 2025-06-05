import User from '../models/user.model.js';
import Order from '../models/order.model.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendResponse from '../utils/sendResponse.js';
import ApiError from '../utils/apiError.js';
import MembershipPackage from '../models/membershipPackage.model.js';
import bcrypt from 'bcryptjs';



const getDashboardStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();

    const activeMembers = await User.countDocuments({ isMember: true });

    const totalMembers = await User.find({
        isDiscovery: true,
        memberShipPlan: {
            $exists: true,
            $ne: null
        }
    });
    const totalMembersCount = totalMembers.length;

    const discoveryMembers = await User.countDocuments({
        isDiscovery: true,
    });

    const recentOrders = await Order.find({
        status: { $ne: 'cancelled' },
    })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'firstName lastName email phoneNumber')
        .populate('product', 'title date time');

    const recentMembers = await User.find({ isMember: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('firstName lastName email isMember isDiscovery memberShipPlan createdAt')
        .lean();

    const recentMembersWithStatus = recentMembers.map(member => ({
        ...member,
        membershipStatus: getMembershipStatus(member)
    }));

    return res
        .status(200)
        .json(new ApiResponse(200, {
            statistics: {
                totalUsers,
                activeMembers,
                discoveryMembers,
                totalMembersCount
            },
            recentOrders,
            recentMembers: recentMembersWithStatus
        }, "Dashboard statistics retrieved successfully"));
});

const getMembershipStatus = (member) => {
    if (member.isMember && member.memberShipPlan) {
        const expiryDate = new Date(member.memberShipPlan.expiryDate);
        if (expiryDate > new Date() && member.memberShipPlan.status === 'active') {
            return 'active';
        }
        return 'expired';
    }
    if (member.isDiscovery && !member.isMember) {
        return 'discovery';
    }
    return 'inactive';
};

const getDetailedStats = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate && endDate) {
        query.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }

    const membersByStatus = await User.aggregate([
        { $match: query },
        {
            $project: {
                status: {
                    $cond: {
                        if: {
                            $and: [
                                { $eq: ['$isMember', true] },
                                { $gt: ['$memberShipPlan.expiryDate', new Date()] },
                                { $eq: ['$memberShipPlan.status', 'active'] }
                            ]
                        },
                        then: 'active',
                        else: {
                            $cond: {
                                if: {
                                    $and: [
                                        { $eq: ['$isDiscovery', true] },
                                        { $eq: ['$isMember', false] }
                                    ]
                                },
                                then: 'discovery',
                                else: 'inactive'
                            }
                        }
                    }
                }
            }
        },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    // Get members by package type
    const membersByPackage = await User.aggregate([
        { $match: { ...query, 'memberShipPlan.package': { $exists: true } } },
        {
            $group: {
                _id: '$memberShipPlan.package.packageName',
                count: { $sum: 1 }
            }
        }
    ]);

    // Get orders by status
    const ordersByStatus = await Order.aggregate([
        { $match: query },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, {
            membersByStatus,
            membersByPackage,
            ordersByStatus
        }, "Detailed statistics retrieved successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const { searchTerm, page = 1, limit = 10 } = req.validatedData.query;

  const pipeline = [];
  const fields = ["firstName", "lastName", "email"];

  const searchStage = searchTerm
  ? {
      $search: {
        compound: {
          should: fields.map((field) => ({
            autocomplete: {
              query: searchTerm,
              path: field,
              fuzzy: { maxEdits: 1},
            },
          })),
        },
      },
    }
  : null;

  if (searchStage) pipeline.push(searchStage);
  pipeline.push(
    {
      $skip: (page - 1) * limit,
    },
    { $limit: limit }
  );
  const users = await User.aggregate(pipeline);
  console.log(searchTerm);
  console.log(users);

  const countPipeline = [];
  if (searchStage) countPipeline.push(searchStage);
  countPipeline.push({ $count: "count" });

  const countResult = await User.aggregate(countPipeline);
  console.log(countResult);
  const totalCount = countResult[0]?.count || 0;
  const totalPages = Math.ceil(totalCount / limit);
  if (!users.length) {
    throw new ApiError("Users not found", 400);
  }

  sendResponse(
    res,
    200,
    { pagination: { page, limit, totalPages }, users },
    "Users retrieved successfully"
  );
});

const editUserMembership = asyncHandler(async (req, res) => {
    
    const {expiryDate} = req.validatedData.body;
    const {userId} = req.validatedData.params;
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError("User not found", 400);
    }
    if(expiryDate<new Date()){
        throw new ApiError("Invalid expiry date", 400);
    }
    user.memberShipPlan.expiryDate = expiryDate;
    await user.save();
    sendResponse(res, 200, user, "User membership updated successfully");

})


const createUserByAdmin = asyncHandler(async(req,res)=>{
    
      const { email, password, firstName, lastName, phoneNumber, birthDate } =
          req.validatedData.body;
      
        const existingUser = await User.findOne({ email });
      
        if (existingUser) {
          throw new ApiError("User already exist", 400);
        }
      
        const hashedPassword = await bcrypt.hash(password, 10);
              
        const user=await User.create({
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phoneNumber,
          birthDate,
        });
      
        sendResponse(res, 200, null, "User created successfully");
})

const addMembershipPlanByAdmin = asyncHandler(async(req,res)=>{
        const {userId, membershipPackageId} = req.validatedData.params;
        
        const existingUser = User.findById(userId);
        if(!existingUser){
            throw new ApiError("User not found", 400);
        }
        const membershipPackage = await MembershipPackage.findById(membershipPackageId);
        if(!membershipPackage){
            throw new ApiError("Membership package not found", 400);
        }
        if(!existingUser.isDiscovery){
            existingUser.memberShipPlan.memberShipFrom = new Date()
            existingUser.memberShipPlan.location = membershipPackage.location
            existingUser.isDiscovery = true
        }
        else{
            existingUser.memberShipPlan.memberShipCount = existingUser.memberShipPlan.memberShipCount + 1;

            existingUser.isMember = true
            existingUser.memberShipPlan = {
                package: membershipPackage._id,
                registrationDate: new Date(),
                remainingSession: membershipPackage.totalSessions,
                status: "active",
                location: membershipPackage.location
            }
        }

        await existingUser.save();
        sendResponse(res, 200, null, "Membership package added successfully");

})

export {
    getDashboardStats,
    getDetailedStats,
    getAllUsers,
    editUserMembership,
    createUserByAdmin,
    addMembershipPlanByAdmin
};