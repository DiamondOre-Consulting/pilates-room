import Admin from "../../models/admin.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import sendResponse from "../../utils/sendResponse.js";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import crypto from "crypto"

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
     
         res.cookie("accessToken", accessToken, cookieOptions);
         res.cookie("refreshAccessToken", refreshAccessToken, cookieOptions);
         existingAdmin.password = undefined;
         existingAdmin.refreshAccessToken = undefined;
         existingAdmin.resetPasswordToken = undefined;
         existingAdmin.resetPasswordTokenExpires = undefined;
     
         sendResponse(res, 200, existingAdmin, "User logged in successfully");

})

export const adminSignOut = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshAccessToken", cookieOptions);
    sendResponse(res, 200, null, "User logged out successfully");
});


export const getAdminProfile = asyncHandler(async(req,res)=>{  
    const user = req.user
    sendResponse(res, 200, user, "User profile fetched successfully");
})



export const changePasswordForAdmin = asyncHandler(async (req, res) => {

  const { newPassword } = req.validatedData.params;
  const existingAdmin = await Admin.findById(req.user._id).select('+password');
  const isSame = await bcrypt.compare(newPassword, existingUser.password);
  if (isSame) {
    throw new ApiError("New password should be different", 400);
  }
  existingAdmin.password = await bcrypt.hash(newPassword, 10);
  await existingAdmin.save();
  sendResponse(res, 200, null, "Password changed successfully");

})



