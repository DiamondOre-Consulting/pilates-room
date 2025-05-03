
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import sendResponse from "../../utils/sendResponse.js";
import { randomUUID } from "crypto";
import User from "../../models/user.model.js";
import { sendMail } from "../../utils/sendmail.js";
import bcrypt from "bcryptjs";




const otpStore = new Map()

const cookieOptions = {
    httpOnly: true,
    // secure: true,
    sameSite: "Lax",
};




export const signIn = asyncHandler(async(req,res)=>{

    const {email,password} = req.validatedData.body

    const existingUser = await User.findOne({email}).select('+password')
    
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


export const signUp = asyncHandler(async(req,res)=>{

    const {email,password,otp,firstName,lastName} = req.validatedData.body
    console.log(req.validatedData.body)
    
    const existingUser = await User.findOne({email})

    if(existingUser){
       throw new ApiError("User already exist",400)
    }

    const hashedPassword = await bcrypt.hash(password, 10);
   
    const storedOtp = otpStore.get(email);
    
    if(!storedOtp){
        throw new ApiError("Otp is missing",400)
    }

    if(storedOtp.otp!==otp){
        throw new ApiError("Otp entered is not matching",400)
    }

     const user = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
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


export const sendOtp = asyncHandler(async(req,res)=>{
     
    const {email} = req.validatedData.body

    const existingUser = await User.findOne({email})

    if(existingUser){
       throw new ApiError("User already exist",400)
    }

    const generatedOTP = () => {
        return randomUUID().replace(/\D/g, '').slice(0, 6);
    };

    const otp=generatedOTP()

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

   sendResponse(res,200,null,"Otp sent successfully")
    

    
})












