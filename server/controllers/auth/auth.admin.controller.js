import Admin from "../../models/admin.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import sendResponse from "../../utils/sendResponse.js";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import { sendMail } from "../../utils/sendmail.js";

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
};


export const adminSignIn = asyncHandler(async (req, res) => {
    
         const {email,password} = req.validatedData.body
     
         const existingAdmin = await Admin.findOne({email}).select('+password')
         
         if (!existingAdmin) {
             throw new ApiError("User not found", 422);
         }
     
         const passwordCheck = await existingAdmin.comparePassword(password);
     
         if (!passwordCheck) {
             throw new ApiError("Password is incorrect", 409);
         }
     
     
         const accessToken = await existingAdmin.generateAccessToken();
         const refreshAccessToken = await existingAdmin.generateRefreshToken();
         existingAdmin.refreshAccessToken = refreshAccessToken;
         await existingAdmin.save();
     
         res.cookie("AdminAccessToken", accessToken, cookieOptions);
         res.cookie("AdminRefreshAccessToken", refreshAccessToken, cookieOptions);
         existingAdmin.password = undefined;
         existingAdmin.refreshAccessToken = undefined;
         existingAdmin.resetPasswordToken = undefined;
         existingAdmin.resetPasswordTokenExpires = undefined;
     
         sendResponse(res, 200, existingAdmin, "User logged in successfully");

})

export const adminSignOut = asyncHandler(async (req, res) => {
    res.clearCookie("AdminAccessToken", cookieOptions);
    res.clearCookie("AdminRefreshAccessToken", cookieOptions);
    sendResponse(res, 200, null, "User logged out successfully");
});


export const getAdminProfile = asyncHandler(async(req,res)=>{  
    const user = req.user
    sendResponse(res, 200, user, "User profile fetched successfully");
})



export const changePasswordForAdmin = asyncHandler(async (req, res) => {

  const { newPassword,oldPassword } = req.validatedData.params;
  const existingAdmin = await Admin.findById(req.user._id).select('+password');
   const comparePassword = await existingAdmin.comparePassword(oldPassword);
  
    if (!comparePassword) {
      throw new ApiError("Old password is incorrect", 400);
    }
  
  const isSame = await bcrypt.compare(newPassword, existingAdmin.password);
  if (isSame) {
    throw new ApiError("New password should be different", 400);
  }
  existingAdmin.password = await bcrypt.hash(newPassword, 10);
  await existingAdmin.save();
  sendResponse(res, 200, null, "Password changed successfully");

})










export const forgotPasswordForAdmin = asyncHandler(async (req, res) => {
  const { email } = req.validatedData.body;

  const existingAdmin = await Admin.findOne({ email });

  if (!existingAdmin) {
    throw new ApiError("User not found", 400);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordTokenExpires = Date.now() + 10 * 60 * 1000;
  const expiryTime = encodeURIComponent(resetPasswordTokenExpires)

  existingAdmin.resetPasswordToken = resetToken;
  existingAdmin.resetPasswordTokenExpires = resetPasswordTokenExpires;

  await existingAdmin.save();


  const resetUrl = `http://localhost:5173/reset-password/${resetToken}/${existingAdmin.email}/${expiryTime}`;

  const emailTemplate = `
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f8f9fa;
        color: #333;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      }
      h1 {
        color: #6a4c93;
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
      }
        .button {
        display: inline-block;
        background-color: #6a4c93; /* Brand purple as solid fill */
        color: #fff !important; /* White text (important for email clients) */
        padding: 12px 24px;
        border-radius: 6px; /* Slightly rounder corners */
        text-decoration: none;
        margin: 20px 0;
        font-weight: bold;
        border: 2px solid #6a4c93; /* Matching border */
        transition: all 0.3s ease; /* Smooth hover effect */
        text-align: center;
        box-shadow: 0 2px 4px rgba(106, 76, 147, 0.2); /* Subtle shadow */
        }

        .button:hover {
        background-color: #7D5BA6; /* Lighter purple on hover */
        transform: translateY(-1px); /* Slight lift */
        box-shadow: 0 4px 8px rgba(106, 76, 147, 0.3);
        }
      .timer {
        color: #FF6B6B;
        font-weight: bold;
        margin: 10px 0;
        font-size: 14px;
      }
      .footer {
        text-align: center;
        color: #777;
        margin-top: 30px;
        font-size: 14px;
      }
      .footer a {
        color: #6a4c93;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Pilates Classroom Password Reset</h1>
      <p>Hello,</p>
      <p>You requested a password reset for your Pilates Classroom account. Click the button below to create a new password:</p>
      <center>
        <a href="${resetUrl}" class="button">Reset Password</a>
      </center>
      <p class="timer">⚠️ For your security, this link will expire in 10 minutes</p>
      <p>If you didn't request this password reset, please ignore this email or contact our support team.</p>
      <p>Stay balanced,</p>
      <p>The Pilates Classroom Team</p>
    </div>
    <div class="footer">
      <p>Need help? <a href="mailto:support@pilatesclassroom.com">Contact our support team</a></p>
      <p>© ${new Date().getFullYear()} Pilates Classroom. All rights reserved.</p>
    </div>
  </body>
</html>`;

  await sendMail(email, "Reset Password", emailTemplate);
  sendResponse(res, 200, null, "Password reset email sent successfully");
});

export const resetPasswordForAdmin = asyncHandler(async (req, res) => {

  const { resetToken } = req.validatedData.params;
  let { newPassword } = req.validatedData.body;

  const existingAdmin = await Admin.findOne({
    resetPasswordToken: resetToken,
    resetPasswordTokenExpires: { $gt: Date.now() },
  }).select('+password');

  if (!existingAdmin) {
    throw new ApiError("Invalid or expired token", 400);
  }
  

  newPassword = await bcrypt.hash(newPassword, 10);
  existingAdmin.password = newPassword;
  existingAdmin.resetPasswordToken = undefined;
  existingAdmin.resetPasswordTokenExpires = undefined;

  await existingAdmin.save();

  sendResponse(res, 200, null, "Password reset successfully");


})






