import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import sendResponse from "../utils/sendResponse.js"
import User from "../models/user.model.js"
import MembershipPackage from "../models/membershipPackage.model.js"
import Razorpay from 'razorpay';
import crypto from "crypto"
import { configDotenv } from "dotenv";

configDotenv()




const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });





export const razorpayKey = asyncHandler(async(req,res)=>{
    sendResponse(res,200,{key:process.env.RAZORPAY_KEY_ID},"Razorpay key found")
})



export const checkoutPayment = asyncHandler(async(req,res)=>{

    const userId = req.user.id
    const { membershipPackageId } = req.validatedData.query

    const existingUser = await User.findById(userId)

    const membershipPackage = await MembershipPackage.findById(membershipPackageId)

    

    if(!existingUser.isDiscovery&&membershipPackage.packageType!=='discovery'){

         throw new ApiError("User has not purchased discovery yet",400)
     
    }

    const totalAmount = membershipPackage.price

    const razorAmount = totalAmount * 100
    const option = {
        amount: razorAmount,
        currency: "INR",
        notes:{
            payer_id:userId,
            membership_package_id:membershipPackageId, 
            membershipType:membershipPackage.packageType
        }
    }

    const order = await razorpay.orders.create(option)
    
    sendResponse(res,200,order,"Order created successfully")

})




export const verifyPayment = async (req, res) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.validatedData.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex')

    if (expectedSignature !== razorpay_signature) {
       throw new ApiError("Invalid signature",400)
    }
    sendResponse(res,200,null,"Payment verified successfully")
}


