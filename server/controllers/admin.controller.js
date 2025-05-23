import User from '../models/user.model.js';
import Order from '../models/order.model.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

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
        .limit(10)
        .populate('user', 'firstName lastName email')
        .populate('product', 'title date time');

    const recentMembers = await User.find({ isMember: true })
        .sort({ createdAt: -1 })
        .limit(10)
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



export {
    getDashboardStats,
    getDetailedStats
};