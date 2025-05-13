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

    const membershipPackages = await MembershipPackage.find({})
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