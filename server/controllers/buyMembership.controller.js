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

export const buyMembership = asyncHandler(async (req, res) => {


    const { membershipPackageId } = req.validatedData.params
    const { paymentId } = req.validatedData.params

    const existingUser = await User.findById(req.user._id)


    const membershipPackage = await MembershipPackage.findById(membershipPackageId)
    if (!membershipPackage) {
        throw new ApiError("Membership package not found", 404)
    }

    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status !== 'captured') {
        throw new ApiError('Payment not captured or failed', 400);
    }

    if (payment.status === 'captured') {


        if (!existingUser.isDiscovery) {
             if(!existingUser.memberShipPlan){
                existingUser.memberShipPlan = {}
            }
            existingUser.memberShipPlan.memberShipFrom = new Date()
            existingUser.memberShipPlan.location = membershipPackage.location
            existingUser.isDiscovery = true
            existingUser.discoveryPaymentId = paymentId


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


            await sendMail(existingUser.email, "Discovery Confirmation", emailTemplateForUser(existingUser.firstName, membershipPackage.packageName))

            await sendMail("jadonyash755@gmail.com", `Order Received From ${existingUser.firstName} For Discovery`, emailTemplateForAdmin(existingUser.firstName, existingUser.lastName, existingUser.email, membershipPackage.packageName))


        }
        else {
             if(!existingUser.memberShipPlan){
                existingUser.memberShipPlan = {}
            }
            existingUser.memberShipPlan.memberShipCount = existingUser.memberShipPlan.memberShipCount + 1;



            existingUser.isMember = true
            existingUser.memberShipPlan = {
                ...existingUser.memberShipPlan,
                package: membershipPackage._id,
                registrationDate: new Date(),
                remainingSession: membershipPackage.totalSessions,
                status: "active",
                subscriptionId: paymentId,
                location: membershipPackage.location
            }
            const emailTemplateForUser = (firstName, packageTitle, location) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Membership Confirmation</title>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            background: #f5f7fa; 
            margin: 0; 
            padding: 0; 
            color: #333;
        }
        .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: #ffffff; 
            border-radius: 12px; 
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        .logo { 
            max-width: 180px; 
            margin-bottom: 15px;
        }
        .content {
            padding: 30px;
        }
        h1 {
            margin: 0 0 20px;
            font-size: 24px;
            color: #2c3e50;
        }
        p {
            margin: 0 0 15px;
            line-height: 1.6;
            font-size: 16px;
            color: #555;
        }
        .highlight-box {
            background: #f8f9fa;
            border-left: 4px solid #6e8efb;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 4px 4px 0;
        }
        .details {
            margin: 25px 0;
        }
        .detail-item {
            display: flex;
            margin-bottom: 10px;
        }
        .detail-label {
            font-weight: bold;
            width: 120px;
            color: #555;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background: #f5f7fa;
            font-size: 14px;
            color: #777;
        }
        .button {
            display: inline-block;
            padding: 12px 25px;
            background: #6e8efb;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://res.cloudinary.com/disdsorfp/image/upload/v1747652022/TPR-Logo_yh2gyj.webp" alt="Logo" class="logo" />
            <h1>Welcome to Our Community!</h1>
        </div>
        
        <div class="content">
            <p>Hi ${firstName},</p>
            <p>Thank you for joining us! We're excited to have you as part of our fitness family.</p>
            
            <div class="highlight-box">
                Your <strong>${packageTitle}</strong> membership is now active. Here are your membership details:
            </div>
            
            <div class="details">
                <div class="detail-item">
                    <span class="detail-label">Membership:</span>
                    <span>${packageTitle}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Location:</span>
                    <span>${location}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Status:</span>
                    <span>Active</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Start Date:</span>
                    <span>${new Date().toLocaleDateString()}</span>
                </div>
            </div>
            
            <p>We can't wait to help you achieve your fitness goals. If you have any questions about your membership or our facilities, please don't hesitate to reach out.</p>
            
            <center>
                <a href="#" class="button">Visit Your Member Portal</a>
            </center>
            
            <p>See you soon at ${location}!</p>
            <p>Best regards,<br>The Fitness Team</p>
        </div>
        
        <div class="footer">
            © ${new Date().getFullYear()} Fitness Center. All rights reserved.<br>
            Need help? Contact us at support@fitnesscenter.com
        </div>
    </div>
</body>
</html>
`;

            const emailTemplateForAdmin = (firstName, lastName, userEmail, packageTitle, location) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>New Membership Purchased</title>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            background: #f5f7fa; 
            margin: 0; 
            padding: 0; 
            color: #333;
        }
        .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: #ffffff; 
            border-radius: 12px; 
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #4a6cf7, #2541b2);
            padding: 25px 20px;
            text-align: center;
            color: white;
        }
        .logo { 
            max-width: 160px; 
            margin-bottom: 10px;
        }
        .content {
            padding: 30px;
        }
        h1 {
            margin: 0 0 20px;
            font-size: 22px;
            color: #2c3e50;
        }
        p {
            margin: 0 0 15px;
            line-height: 1.6;
            font-size: 15px;
            color: #555;
        }
        .alert-box {
            background: #fff8f8;
            border-left: 4px solid #ff6b6b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 4px 4px 0;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
        }
        .details-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
            text-align: left;
        }
        .details-table tr:last-child td {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #555;
            width: 35%;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background: #f5f7fa;
            font-size: 13px;
            color: #777;
            border-top: 1px solid #eee;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background: #4a6cf7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin: 15px 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://res.cloudinary.com/disdsorfp/image/upload/v1747652022/TPR-Logo_yh2gyj.webp" alt="Logo" class="logo" />
            <h1>New Membership Purchase Notification</h1>
        </div>
        
        <div class="content">
            <div class="alert-box">
                <strong>Action Required:</strong> A new membership has been purchased and requires attention.
            </div>
            
            <table class="details-table">
                <tr>
                    <td class="label">Member Name:</td>
                    <td>${firstName} ${lastName}</td>
                </tr>
                <tr>
                    <td class="label">Email:</td>
                    <td>${userEmail}</td>
                </tr>
                <tr>
                    <td class="label">Package:</td>
                    <td>${packageTitle}</td>
                </tr>
                <tr>
                    <td class="label">Location:</td>
                    <td>${location}</td>
                </tr>
                <tr>
                    <td class="label">Purchase Date:</td>
                    <td>${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</td>
                </tr>
            </table>
            
            <p>This membership has been automatically activated in the system. Please review the details in the admin panel.</p>
            
            <center>
                <a href="#" class="button">View in Admin Dashboard</a>
            </center>
            
            <p style="margin-top: 25px;"><em>This is an automated notification. No action is required unless there are discrepancies.</em></p>
        </div>
        
        <div class="footer">
            © ${new Date().getFullYear()} Fitness Center Admin System<br>
            You're receiving this email because you're a registered administrator.
        </div>
    </div>
</body>
</html>
`;


            await sendMail(existingUser.email, "Membership Confirmation", emailTemplateForUser(existingUser.firstName, membershipPackage.packageName,membershipPackage.location))

            await sendMail("jadonyash755@gmail.com", `Order Received From ${existingUser.firstName} For membership`, emailTemplateForAdmin(existingUser.firstName, existingUser.lastName, existingUser.email, membershipPackage.packageName,membershipPackage.location))

        }



        await existingUser.save()

    }





    sendResponse(res, 200, null, "Membership purchased successfully")


})


