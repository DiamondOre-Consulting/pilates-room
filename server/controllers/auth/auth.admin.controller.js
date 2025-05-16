import Admin from "../../models/admin.model";
import asyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/apiError";
import sendResponse from "../../utils/sendResponse";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import crypto from "crypto"

const cookieOptions = {
    httpOnly: true,
    // secure: true,
    sameSite: "Lax",
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