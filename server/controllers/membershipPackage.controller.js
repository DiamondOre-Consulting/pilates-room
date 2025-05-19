import asyncHandler from "../utils/asyncHandler.js"
import MembershipPackage from "../models/membershipPackage.model.js"
import ApiError from "../utils/apiError.js"
import sendResponse from "../utils/sendResponse.js"


export const createMembershipPackage = asyncHandler(async(req,res)=>{

    const exists = await MembershipPackage.findOne({ packageName: req.validatedData.body.packageName });

    if (exists) {
        return res.status(400).json({ message: 'Package with this name already exists' });
    }
    


    const newMembershipPackage = await MembershipPackage.create(req.validatedData.body)
    sendResponse(res,200,newMembershipPackage,"Membership package created successfully")

})


export const getAllMembershipPackages = asyncHandler(async(req,res)=>{


    const query = {}
    if(req.validatedData.query.packageType){
        query.packageType = req.validatedData.query.packageType
    }

    const membershipPackages = await MembershipPackage.find(query)
    if(membershipPackages.length === 0){
        throw new ApiError("Membership packages not found",404)
    }
    sendResponse(res,200,membershipPackages,"Membership packages fetched successfully")
})


export const getSingleMembershipPackage = asyncHandler(async(req,res)=>{

    const membershipPackage = await MembershipPackage.findById(req.validatedData.params.membershipPackageId)
    if(!membershipPackage){
        throw new ApiError("Membership package not found",404)
    }
    sendResponse(res,200,membershipPackage,"Membership package fetched successfully")
})


export const deleteMembershipPackage = asyncHandler(async(req,res)=>{

    const {membershipPackageId} = req.validatedData.params

    const deletedMembershipPackage = await MembershipPackage.findByIdAndDelete(membershipPackageId)
    if(!deletedMembershipPackage){
        throw new ApiError("Membership package not found",404)
    }
    sendResponse(res,200,null,"Membership package deleted successfully")
    }
)


export const editMembershipPackage = asyncHandler(async(req,res)=>{ 

    const {membershipPackageId} = req.validatedData.params

    const existingMembershipPackage = await MembershipPackage.findById(membershipPackageId)
    if(!existingMembershipPackage){
        throw new ApiError("Membership package not found",404)
    }

    Object.assign(existingMembershipPackage, req.validatedData.body);
  
    await existingMembershipPackage.save()

    sendResponse(res,200,existingMembershipPackage,"Membership package updated")
    }
)