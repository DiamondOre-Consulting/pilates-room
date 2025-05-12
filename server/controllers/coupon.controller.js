import asyncHandler  from "../utils/asyncHandler.js";
import Coupon from "../models/coupon.model.js";
import sendResponse from "../utils/sendResponse.js";
import ApiError from "../utils/apiError.js";






export const createCoupon = asyncHandler(async(req,res)=>{

    const {couponCode,discountType,startDate,endDate,minAmount,discountValue,isActive, isFirst} = req.validatedData.body 

    if (new Date(startDate) >= new Date(endDate)) {
        throw new ApiError("Invalid date range", 400);
    }

    const existingCoupon = await Coupon.findOne({couponCode})

    if(existingCoupon){
        throw new ApiError("Coupon already exists",400)
    }

    const newCouponCode = await Coupon.create({couponCode,discountType,startDate,endDate,minAmount,discountValue,isActive,isFirst})

    sendResponse(res,200,newCouponCode,"Coupon created")
 
})

export const getAllCoupons = asyncHandler(async(req,res)=>{

    const coupons = await Coupon.find({})

    if(!coupons.length===0){
        throw new ApiError("No coupons found",400)
    }

    sendResponse(res,200,coupons,"Coupons retrieved successfully")

})

export const deleteCoupon = asyncHandler(async(req,res)=>{

    const {couponId} = req.validatedData.params
    const coupon = await Coupon.findById(couponId)
    if(!coupon){
        throw new ApiError("Coupon not found",404)
    }
    await Coupon.findByIdAndDelete(couponId)
    sendResponse(res,200,coupon,"Coupon deleted")

})

export const editCoupon = asyncHandler(async(req,res)=>{

    const {couponId} = req.validatedData.params
    const {startDate,endDate} = req.validatedData.body 


    if (new Date(startDate) >= new Date(endDate)) {
        throw new ApiError("Invalid date range", 400);
    }

    const existingCoupon= await Coupon.findById(couponId)
    if (!existingCoupon) {
        throw new ApiError("Coupon not found",400)    
    }

    Object.assign(existingCoupon, req.validatedData.body);
  
    
    await existingCoupon.save()

    sendResponse(res,200,existingCoupon,"Coupon updated")


})

