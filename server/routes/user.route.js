import {Router} from "express"
import  validate  from "../middlewares/zod.validator.js"
import { signUpBodySchema,signInBodySchema,sendOtpBodySchema, forgotPasswordBodySchema, resetPasswordBodySchema, resetPasswordParamsSchema, newPasswordParamsSchema } from "../validator/auth.validator.js"
import { signIn,sendOtp,signUp, forgotPassword, resetPassword, changePassword } from "../controllers/auth/auth.user.controller.js"
import { userMiddleware } from "../middlewares/user.middleware.js"
import { getClassesBodySchema } from "../validator/class.validator.js"
import { getClasses } from "../controllers/admin/class.admin.controller.js"



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

 userRouter.post('/change-password/:newPassword',userMiddleware,validate({ params:newPasswordParamsSchema}),changePassword)

 userRouter.post('/get-classes',validate({ body:getClassesBodySchema }),getClasses)












 export default userRouter


