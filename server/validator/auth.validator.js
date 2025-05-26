import {z} from "zod";



export const signUpBodySchema = z.object({
    firstName:z.string().min(3).max(30),
    lastName:z.string().min(3).max(30),
    email:z.string().email(),
    password:z.string().min(6).max(20),
    otp:z.string().min(6).max(6),
    phoneNumber:z.string().min(10).max(10),
    birthDate:z.coerce.date()
})

export const editUserBodySchema = z.object({
    firstName:z.string().min(3).max(30).optional(),
    lastName:z.string().min(3).max(30).optional(),
    email:z.string().email().optional(),
    phoneNumber:z.string().min(10).max(10).optional(),
    birthDate:z.coerce.date().optional()
})



export const signInBodySchema = z.object({
    email : z.string().email().trim(),
    password : z.string().min(6).trim(),
})


export const sendOtpBodySchema = z.object({
    email : z.string().email().trim(),
})


export const forgotPasswordBodySchema = z.object({
    email : z.string().email().trim()
 })


 
 export const resetPasswordBodySchema = z.object({
    newPassword: z.string().trim()
})


export const resetPasswordParamsSchema = z.object({
   resetToken : z.string().trim()
})


export const newPasswordParamsSchema = z.object({
    newPassword : z.string().trim()
})



export const adminSignInBodySchema = z.object({
    email : z.string().email().trim(),
    password : z.string().min(6).trim(),
})





 
 

