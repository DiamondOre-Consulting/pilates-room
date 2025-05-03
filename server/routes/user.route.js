import {Router} from "express"
import  validate  from "../middlewares/zod.validator.js"
import { signUpBodySchema,signInBodySchema,sendOtpBodySchema, forgotPasswordBodySchema } from "../validator/auth.validator.js"
import { signIn,sendOtp,signUp, forgotPassword } from "../controllers/auth/auth.controller.js"



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

 export default userRouter


