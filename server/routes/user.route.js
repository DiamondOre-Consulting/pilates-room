import {Router} from "express"
import  validate  from "../middlewares/zod.validator.js"
import { signUpBodySchema,signInBodySchema,sendOtpBodySchema, forgotPasswordBodySchema, resetPasswordBodySchema, resetPasswordParamsSchema, newPasswordParamsSchema } from "../validator/auth.validator.js"
import { signIn,sendOtp,signUp, forgotPassword, resetPassword, changePassword, getProfile } from "../controllers/auth/auth.user.controller.js"
import { userMiddleware } from "../middlewares/user.middleware.js"

import { getClasses } from "../controllers/class.admin.controller.js"
import { getClassesQuerySchema } from "../validator/class.validator.js"
import { getAllPackages } from "../controllers/package.admin.controller.js"
import { getAllPackagesQuerySchema } from "../validator/package.validator.js"
import { addToCartParamsSchema } from "../validator/order.validator.js"
import { addToCart } from "../controllers/order.controller.js"
import { fetchMoreInfo, getSingleTraining, getTrainings } from "../controllers/training.controller.js"
import { fetchMoreInfoParamsSchema, getAllTrainingsQuerySchema, getSingleTrainingParamsSchema } from "../validator/training.validator.js"


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

userRouter.get('/get-classes',validate({ query:getClassesQuerySchema }),getClasses)

userRouter.get('/get-all-packages', validate({
      query:getAllPackagesQuerySchema
}),getAllPackages)

userRouter.post('/add-to-cart/:id/:itemType',userMiddleware,validate({
    params:addToCartParamsSchema
}),addToCart)

userRouter.get('/fetch-more-info/:trainingId',userMiddleware,validate({
    params:fetchMoreInfoParamsSchema
}),fetchMoreInfo)

userRouter.get('/get-all-trainings',validate({
     query:getAllTrainingsQuerySchema
 }),getTrainings)
 
userRouter.get('/get-single-training/:trainingId',validate({
     params:getSingleTrainingParamsSchema
}),getSingleTraining)


userRouter.get('/get-user',userMiddleware,getProfile)















 export default userRouter


