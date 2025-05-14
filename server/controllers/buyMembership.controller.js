import asyncHandler from "../utils/asyncHandler.js";
import MembershipPackage from "../models/membershipPackage.model.js";
import ApiError from "../utils/apiError.js";
import Razorpay from 'razorpay';
import User from "../models/user.model.js";
import { configDotenv } from "dotenv";
import sendResponse from "../utils/sendResponse.js";

configDotenv()


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
  
export const buyMembership = asyncHandler(async(req,res)=>{


    const {membershipPackageId} = req.validatedData.params
    const {paymentId} = req.validatedData.params


    const membershipPackage = await MembershipPackage.findById(membershipPackageId)
    if(!membershipPackage){
        throw new ApiError("Membership package not found",404)
    }

    
    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status !== 'captured') {
    throw new ApiError('Payment not captured or failed', 400);
    }

    if(payment.status === 'captured'){
        
        const existingUser = await User.findById(req.user._id)

        if(!existingUser.isDiscovery){
            existingUser.isDiscovery = true
            existingUser.discoveryPaymentId=paymentId
        }
        else{
            existingUser.isMember = true
            existingUser.membershipPackage ={
                 package: membershipPackage._id,
                 registrationDate: new Date(),
                 remainingSession: membershipPackage.totalSessions,
                 status:"active",
                 subscriptionId:paymentId

        }

      
       
        }

        await existingUser.save()
 
    }

    sendResponse(res,200,null,"Membership purchased successfully")
      
       
})


