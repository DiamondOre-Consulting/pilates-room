import asyncHandler from "../utils/asyncHandler.js";
import MembershipPackage from "../models/membershipPackage.model.js";
import ApiError from "../utils/apiError.js";
import Razorpay from 'razorpay';
import User from "../models/user.model.js";
import { configDotenv } from "dotenv";
import sendResponse from "../utils/sendResponse.js";
import { sendMail } from "../utils/sendmail.js";

configDotenv()


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
  
export const buyMembership = asyncHandler(async(req,res)=>{


    const {membershipPackageId} = req.validatedData.params
    const {paymentId} = req.validatedData.params

    const existingUser = await User.findById(req.user._id)


    const membershipPackage = await MembershipPackage.findById(membershipPackageId)
    if(!membershipPackage){
        throw new ApiError("Membership package not found",404)
    }
   
    
    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status !== 'captured') {
    throw new ApiError('Payment not captured or failed', 400);
    }

    if(payment.status === 'captured'){
        
        

            if(!existingUser.isDiscovery){
                existingUser.memberShipPlan.memberShipFrom = new Date()
                existingUser.isDiscovery = true
                existingUser.discoveryPaymentId=paymentId


                const emailTemplateForUser = (firstName, packageTitle) => `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8" />
                <title>Discovery Confirmation</title>
                <style>
                    body { font-family: Arial, sans-serif; background:#f7f7f7; margin:0; padding:20px; }
                    .container { max-width:600px; margin:auto; background:#fff; padding:20px; border-radius:8px; text-align:center; }
                    h2 { color:#333; }
                    p { color:#555; }
                    .logo { max-width:150px; margin-bottom:20px; }
                </style>
                </head>
                <body>
                <div class="container">
                    <img src="https://res.cloudinary.com/disdsorfp/image/upload/v1747652022/TPR-Logo_yh2gyj.webp" alt="Logo" class="logo" />
                    <h2>Discovery Confirmation</h2>
                    <p>Hi ${firstName} ,</p>
                    <p>Thank you for purchasing the <strong>${packageTitle}</strong> discovery package.</p>
                    <p>Your discovery membership is now active. If you have any questions, please contact our support team.</p>
                    <p>Welcome to the community!</p>
                </div>
                </body>
                </html>
                `;

                const emailTemplateForAdmin = (firstName, lastName, userEmail, packageTitle) => `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8" />
                <title>New Discovery Membership Purchased</title>
                <style>
                    body { font-family: Arial, sans-serif; background:#f7f7f7; margin:0; padding:20px; }
                    .container { max-width:600px; margin:auto; background:#fff; padding:20px; border-radius:8px; text-align:center; }
                    h2 { color:#333; }
                    p { color:#555; }
                    .logo { max-width:150px; margin-bottom:20px; }
                </style>
                </head>
                <body>
                <div class="container">
                    <img src="https://res.cloudinary.com/disdsorfp/image/upload/v1747652022/TPR-Logo_yh2gyj.webp" alt="Logo" class="logo" />
                    <h2>New Discovery Membership Purchase</h2>
                    <p>User <strong>${firstName} ${lastName}</strong> (${userEmail}) has purchased the <strong>${packageTitle}</strong> discovery membership package.</p>
                    <p>Please review the details in the admin panel.</p>
                </div>
                </body>
                </html>
                `;
                

                await sendMail(existingUser.email,"Discovery Confirmation",emailTemplateForUser(existingUser.firstName,membershipPackage.packageName))
                
                await sendMail("jadonyash755@gmail.com",`Order Received From ${existingUser.firstName} For Discovery`,emailTemplateForAdmin(existingUser.firstName,existingUser.lastName,existingUser.email,existingClass.title))
        

            }
            else{
                existingUser.memberShipPlan.memberShipCount= existingUser.memberShipPlan.memberShipCount+1;

                

                existingUser.isMember = true
                existingUser.memberShipPlan ={
                    package: membershipPackage._id,
                    registrationDate: new Date(),
                    remainingSession: membershipPackage.totalSessions,
                    status:"active",
                    subscriptionId:paymentId


                    
                }
                const emailTemplateForUser = (firstName, packageTitle) => `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8" />
                <title>Membership Confirmation</title>
                <style>
                    body { font-family: Arial, sans-serif; background:#f7f7f7; margin:0; padding:20px; }
                    .container { max-width:600px; margin:auto; background:#fff; padding:20px; border-radius:8px; text-align:center; }
                    h2 { color:#333; }
                    p { color:#555; }
                    .logo { max-width:150px; margin-bottom:20px; }
                </style>
                </head>
                <body>
                <div class="container">
                    <img src="https://res.cloudinary.com/disdsorfp/image/upload/v1747652022/TPR-Logo_yh2gyj.webp" alt="Logo" class="logo" />
                    <h2>Membership Confirmation</h2>
                    <p>Hi ${firstName} ,</p>
                    <p>Thank you for purchasing the <strong>${packageTitle}</strong> membership package.</p>
                    <p>Your membership is now active. If you have any questions, please contact our support team.</p>
                    <p>Welcome to the community!</p>
                </div>
                </body>
                </html>
                `;

                const emailTemplateForAdmin = (firstName, lastName, userEmail, packageTitle) => `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8" />
                <title>New Membership Purchased</title>
                <style>
                    body { font-family: Arial, sans-serif; background:#f7f7f7; margin:0; padding:20px; }
                    .container { max-width:600px; margin:auto; background:#fff; padding:20px; border-radius:8px; text-align:center; }
                    h2 { color:#333; }
                    p { color:#555; }
                    .logo { max-width:150px; margin-bottom:20px; }
                </style>
                </head>
                <body>
                <div class="container">
                    <img src="https://res.cloudinary.com/disdsorfp/image/upload/v1747652022/TPR-Logo_yh2gyj.webp" alt="Logo" class="logo" />
                    <h2>New Membership Purchase</h2>
                    <p>User <strong>${firstName} ${lastName}</strong> (${userEmail}) has purchased the <strong>${packageTitle}</strong> membership package.</p>
                    <p>Please review the details in the admin panel.</p>
                </div>
                </body>
                </html>
                `;
                

                await sendMail(existingUser.email,"Membership Confirmation",emailTemplateForUser(existingUser.firstName,membershipPackage.packageName))
                
                await sendMail("jadonyash755@gmail.com",`Order Received From ${existingUser.firstName} For membership`,emailTemplateForAdmin(existingUser.firstName,existingUser.lastName,existingUser.email,existingClass.title))
              
        
        }



        await existingUser.save()
 
    }


    


    sendResponse(res,200,null,"Membership purchased successfully")
      
       
})


