import { Router } from "express"
import validate from "../middlewares/zod.validator.js"
import { signUpBodySchema, signInBodySchema, sendOtpBodySchema, forgotPasswordBodySchema, resetPasswordBodySchema, resetPasswordParamsSchema, newPasswordParamsSchema } from "../validator/auth.validator.js"
import { signIn, sendOtp, signUp, forgotPassword, resetPassword, changePassword, getProfile, signOut } from "../controllers/auth/auth.user.controller.js"
import { userMiddleware } from "../middlewares/user.middleware.js"

import { getClasses, getScheduledClass } from "../controllers/class.admin.controller.js"
import { getClassesQuerySchema } from "../validator/class.validator.js"
// import { getAllPackages } from "../controllers/post.admin.controller.js"
// import { getAllPackagesQuerySchema } from "../validator/package.validator.js"


import { fetchMoreInfo, getSingleTraining, getTrainings } from "../controllers/training.controller.js"
import { fetchMoreInfoParamsSchema, getAllTrainingsQuerySchema, getSingleTrainingParamsSchema } from "../validator/training.validator.js"
import { buyMembershipBodySchema, getAllMembershipPackagesForUserQuerySchema } from "../validator/membershipPackage.validator.js"
import { getAllMembershipPackages } from "../controllers/membershipPackage.controller.js"
import { checkoutPayment, razorpayKey, verifyPayment } from "../controllers/payment.controller.js"
import { checkoutPaymentQuerySchema, verifyPaymentBodySchema } from "../validator/payment.validator.js"
import { buyMembership } from "../controllers/buyMembership.controller.js"
import { cancelOrder, createOrder, orderHistory } from "../controllers/order.controller.js"
import { createOrderBodySchema, createOrderParamsSchema, deleteOrderParamsSchema } from "../validator/order.validator.js"
import { createEnquiry } from "../controllers/enquiry.controller.js"


const userRouter = Router()

userRouter.post('/signup', validate({
    body: signUpBodySchema
}), signUp)

userRouter.post('/signin', validate({
    body: signInBodySchema
}), signIn)

userRouter.post('/send-otp', validate({
    body: sendOtpBodySchema
}), sendOtp)

userRouter.post('/forgot-password', validate({ body: forgotPasswordBodySchema }), forgotPassword)

userRouter.post('/reset-password/:resetToken', validate({ body: resetPasswordBodySchema, params: resetPasswordParamsSchema }), resetPassword)

userRouter.post('/change-password/:newPassword', userMiddleware, validate({ params: newPasswordParamsSchema }), changePassword)

userRouter.get('/get-classes', validate({ query: getClassesQuerySchema }), getClasses)

// userRouter.get('/get-all-packages', validate({
//       query:getAllPackagesQuerySchema
// }),getAllPackages)

userRouter.get('/fetch-more-info/:trainingId', userMiddleware, validate({
    params: fetchMoreInfoParamsSchema
}), fetchMoreInfo)

userRouter.get('/get-all-trainings', validate({
    query: getAllTrainingsQuerySchema
}), getTrainings)

userRouter.get('/get-single-training/:trainingId', validate({
    params: getSingleTrainingParamsSchema
}), getSingleTraining)


userRouter.get('/get-user', userMiddleware, getProfile)

userRouter.get('/get-membership-packages', validate({
    query: getAllMembershipPackagesForUserQuerySchema
}), getAllMembershipPackages)


userRouter.get('/key', userMiddleware, razorpayKey)

userRouter.post('/checkout-payment', userMiddleware, validate({
    query: checkoutPaymentQuerySchema
}), checkoutPayment)

userRouter.post('/verify-payment', userMiddleware, validate({ body: verifyPaymentBodySchema }), verifyPayment)



userRouter.post('/buy-membership/:membershipPackageId/:paymentId', userMiddleware, validate({
    params: buyMembershipBodySchema
}), buyMembership)

userRouter.post('/create-order/:classId', userMiddleware, validate({
    params: createOrderParamsSchema, body: createOrderBodySchema
}), createOrder)

userRouter.get('/sign-out', userMiddleware, signOut)

userRouter.put('/cancel-order/:orderId', userMiddleware, validate({
    params: deleteOrderParamsSchema
}), cancelOrder)

userRouter.get('/get-scheduled-class', userMiddleware, getScheduledClass)

userRouter.get('/get-order-history', userMiddleware, orderHistory)

userRouter.post('/create-enquiry', createEnquiry)



























export default userRouter