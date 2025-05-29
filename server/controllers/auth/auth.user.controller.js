
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import sendResponse from "../../utils/sendResponse.js";
import { randomUUID } from "crypto";
import User from "../../models/user.model.js";
import { sendMail } from "../../utils/sendmail.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"




const otpStore = new Map()

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};




export const signIn = asyncHandler(async (req, res) => {

  const { email, password } = req.validatedData.body

  const existingUser = await User.findOne({ email }).select('+password').populate({
    path: 'upcomingSchedule.item',
    model: 'Order'
  })
    .populate({
      path: 'memberShipPlan.package',
      model: 'MembershipPackage'
    });

  if (!existingUser) {
    throw new ApiError("User not found", 422);
  }

  const passwordCheck = await existingUser.comparePassword(password);

  if (!passwordCheck) {
    throw new ApiError("Password is incorrect", 409);
  }


  const accessToken = await existingUser.generateAccessToken();
  const refreshAccessToken = await existingUser.generateRefreshToken();
  existingUser.refreshAccessToken = refreshAccessToken;
  await existingUser.save();

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshAccessToken", refreshAccessToken, cookieOptions);
  existingUser.password = undefined;
  existingUser.refreshAccessToken = undefined;
  existingUser.resetPasswordToken = undefined;
  existingUser.resetPasswordTokenExpires = undefined;

  sendResponse(res, 200, existingUser, "User logged in successfully");

})

export const signUp = asyncHandler(async (req, res) => {

  const { email, password, otp, firstName, lastName, phoneNumber, birthDate } = req.validatedData.body


  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new ApiError("User already exist", 400)
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const storedOtp = otpStore.get(email);

  if (!storedOtp) {
    throw new ApiError("Otp is missing", 400)
  }

  if (storedOtp.otp !== otp) {
    throw new ApiError("Otp entered is not matching", 400)
  }

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phoneNumber,
    birthDate
  });

  otpStore.delete("email");

  const token = await user.generateAccessToken();
  const refreshAccessToken = await user.generateRefreshToken();
  user.refreshAccessToken = refreshAccessToken;


  await user.save();

  user.password = undefined;
  user.refreshAccessToken = undefined;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;

  res.cookie("accessToken", token, cookieOptions);
  res.cookie("refreshAccessToken", refreshAccessToken, cookieOptions);

  sendResponse(res, 200, user, "User created successfully")


})

export const sendOtp = asyncHandler(async (req, res) => {

  const { email } = req.validatedData.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new ApiError("User already exist", 400)
  }

  const generatedOTP = () => {
    return randomUUID().replace(/\D/g, '').slice(0, 6);
  };

  const otp = generatedOTP()

  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });


  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2 style="color: #b8860b;">Pilates Room</h2>
        <p>Dear Customer,</p>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <h3 style="color: #d4af37;">${otp}</h3>
        <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
        <p>Thank you for choosing Pilates Room.</p>
        <p style="font-size: 12px; color: gray;">If you did not request this, please ignore this email.</p>
    </div>
    `;

  sendMail(email, "OTP for signup", emailTemplate);

  console.log(otp)

  sendResponse(res, 200, null, "Otp sent successfully")



})

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.validatedData.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new ApiError("User not found", 400);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordTokenExpires = Date.now() + 10 * 60 * 1000;
  const expiryTime = encodeURIComponent(resetPasswordTokenExpires)

  existingUser.resetPasswordToken = resetToken;
  existingUser.resetPasswordTokenExpires = resetPasswordTokenExpires;

  await existingUser.save();


  const resetUrl = `http://localhost:5173/reset-password/${resetToken}/${existingUser.email}/${expiryTime}`;

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

export const resetPassword = asyncHandler(async (req, res) => {

  const { resetToken } = req.validatedData.params;
  let { newPassword } = req.validatedData.body;

  const existingUser = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordTokenExpires: { $gt: Date.now() },
  }).select('+password');

  if (!existingUser) {
    throw new ApiError("Token expired", 400)
  }

  newPassword = await bcrypt.hash(newPassword, 10);
  existingUser.password = newPassword;
  existingUser.resetPasswordToken = undefined;
  existingUser.resetPasswordTokenExpires = undefined;

  await existingUser.save();

  sendResponse(res, 200, null, "Password reset successfully");


})

export const changePassword = asyncHandler(async (req, res) => {

  const { newPassword } = req.validatedData.params;
  const existingUser = await User.findById(req.user._id).select('+password');
  const isSame = await bcrypt.compare(newPassword, existingUser.password);
  if (isSame) {
    throw new ApiError("New password should be different", 400);
  }
  existingUser.password = await bcrypt.hash(newPassword, 10);
  await existingUser.save();
  sendResponse(res, 200, null, "Password changed successfully");

})

export const signOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id,
    {
      $set: { refreshToken: "" }
    },
    { new: true }
  )

  console.log("object")
  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json({ success: true, message: "User logged out successfully!" });
})

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId)
    .populate({
      path: 'upcomingSchedule.item',
      model: 'Order'
    })
    .populate({
      path: 'memberShipPlan.package',
      model: 'MembershipPackage'
    });

  sendResponse(res, 200, user, "User profile fetched successfully");
});

export const editUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { email, phoneNumber } = req.validatedData.body

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError("User not found", 400);
  }

  if (email && email !== user.email) {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) throw new ApiError("Email already in use", 400);
  }

  if (phoneNumber && phoneNumber !== user.phoneNumber) {
    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) throw new ApiError("Phone already in use", 400);
  }

  Object.assign(user, req.validatedData.body);

  const updatedUser = await user.save();

  sendResponse(res, 200, updatedUser, "User updated successfully");
});











