import {Router} from "express"
import  validate  from "../middlewares/zod.validator.js"
import { signUpBodySchema,signInBodySchema,sendOtpBodySchema, forgotPasswordBodySchema, resetPasswordBodySchema, resetPasswordParamsSchema } from "../validator/auth.validator.js"
import { signIn,sendOtp,signUp, forgotPassword, resetPassword } from "../controllers/auth/auth.user.controller.js"



const userRouter = Router()


userRouter.post('/signup',validate({
    body:signUpBodySchema
}),signUp)


userRouter.post('/signin',validate({
    body:signInBodySchema
}),signIn)


userRouter.post('/send-otp',validate({
    body:sendOtpBodySchema
 }),sendOtp)


 userRouter.post('/forgot-password', validate({body:forgotPasswordBodySchema}),forgotPassword)

 userRouter.post('/reset-password/:resetToken',validate({body:resetPasswordBodySchema, params:resetPasswordParamsSchema}),resetPassword)












 export default userRouter


