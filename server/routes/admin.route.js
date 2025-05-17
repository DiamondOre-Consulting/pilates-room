import  {Router} from "express"
import { adminMiddleware } from "../middlewares/admin.middleware.js"
import { createClass, deleteClass, editClass, getClasses } from "../controllers/class.admin.controller.js"
import { createClassBodySchema, getClassesQuerySchema, deleteClassParamsSchema, editClassBodySchema, editClassParamsSchema } from "../validator/class.validator.js"
import { upload } from "../middlewares/multer.middleware.js"
import validate from "../middlewares/zod.validator.js"
// import { createPackage, deletePackage, editPackage, getAllPackages, getSinglePackage } from "../controllers/post.admin.controller.js"
// import { createPackageBodySchema, deletePackageParamsSchema, editPackageBodySchema, editPackageParamsSchema, getAllPackagesQuerySchema, getSinglePackageParamsSchema } from "../validator/package.validator.js"
import { createTraining, deleteTraining, editTraining, getSingleTraining, getTrainings } from "../controllers/training.controller.js"
import { createTrainingBodySchema, deleteTrainingParamsSchema, editTrainingBodySchema, editTrainingsParamsSchema, getAllTrainingsQuerySchema, getSingleTrainingParamsSchema } from "../validator/training.validator.js"
import { createCoupon, deleteCoupon, editCoupon, getAllCoupons } from "../controllers/coupon.controller.js"
import { createCouponBodySchema, deleteCouponParamsSchema, editCouponBodySchema, editCouponParamsSchema } from "../validator/coupon.validator.js"
import { createMembershipPackage, deleteMembershipPackage, editMembershipPackage, getAllMembershipPackages, getSingleMembershipPackage } from "../controllers/membershipPackage.controller.js"
import { createMembershipPackageBodySchema, deleteMembershipPackageParamsSchema, editMembershipPackageBodySchema, editMembershipPackageParamsSchema, getAllMembershipPackagesForUserQuerySchema, getSingleMembershipPackageParamsSchema } from "../validator/membershipPackage.validator.js"
import { adminSignIn, adminSignOut, getAdminProfile } from "../controllers/auth/auth.admin.controller.js"
import { adminSignInBodySchema } from "../validator/auth.validator.js"



const adminRouter = Router()



adminRouter.post('/create-class',upload(1).fields([{ name: "image", maxCount: 4 }, { name: "instructor.image", maxCount:1}]),validate({
   body:createClassBodySchema
}),createClass)

adminRouter.get('/get-classes',validate({
    query:getClassesQuerySchema
}),getClasses)


adminRouter.delete('/delete-class/:classId',validate({
 params: deleteClassParamsSchema
}),deleteClass)

adminRouter.put('/edit-class/:classId',upload(2).fields([{ name: "image", maxCount: 4 }, { name: "instructor.image", maxCount:1}]),validate({
    body:editClassBodySchema, params: editClassParamsSchema
}),editClass)


// adminRouter.post('/create-package',upload(2).single("packageImage"),validate({
//     body:createPackageBodySchema
// }),createPackage)

// adminRouter.get('/get-all-packages',validate({
//     query:getAllPackagesQuerySchema
// }),getAllPackages)


// adminRouter.get('/get-single-package/:packageId',validate({
//     params:getSinglePackageParamsSchema
// }),getSinglePackage)


// adminRouter.delete('/delete-package/:packageId',validate({
//     params:deletePackageParamsSchema
// }),deletePackage)

// adminRouter.put('/edit-package/:packageId',upload(2).single("packageImage"),validate({
//     body:editPackageBodySchema, params:editPackageParamsSchema
// }),editPackage)


adminRouter.post('/create-training' ,upload(2).fields([{ name: 'trainingImage', maxCount: 30 },{ name: 'thumbnailImage', maxCount: 1 }]),validate({
   body:createTrainingBodySchema
}),createTraining)


adminRouter.get('/get-all-trainings',validate({
    query:getAllTrainingsQuerySchema
}),getTrainings)

adminRouter.get('/get-single-training/:trainingId',validate({
    params:getSingleTrainingParamsSchema
}),getSingleTraining)


adminRouter.delete('/delete-training/:trainingId',validate({
    params:deleteTrainingParamsSchema
}),deleteTraining)


adminRouter.put('/edit-training/:trainingId',upload(2).fields([{ name: 'trainingImage', maxCount: 30 },{ name: 'thumbnailImage', maxCount: 1 }]),validate({
    body:editTrainingBodySchema, params:editTrainingsParamsSchema
}),editTraining)


adminRouter.post('/create-coupon',validate({
  body:createCouponBodySchema
}),createCoupon)


adminRouter.get('/get-all-coupons',getAllCoupons)

adminRouter.delete('/delete-coupon/:couponId',validate({
   params:deleteCouponParamsSchema
}),deleteCoupon)


adminRouter.put('/edit-coupon/:couponId',validate({
    body:editCouponBodySchema, params:editCouponParamsSchema
}),editCoupon)


adminRouter.post('/create-membership-package',validate({
    body:createMembershipPackageBodySchema
}),createMembershipPackage)

adminRouter.get('/get-all-membership-packages',validate({
    query:getAllMembershipPackagesForUserQuerySchema
}),getAllMembershipPackages)

adminRouter.get('/get-single-membership-package/:membershipPackageId',validate({
    params:getSingleMembershipPackageParamsSchema
}),getSingleMembershipPackage)

adminRouter.delete('/delete-membership-package/:membershipPackageId',validate({
    params:deleteMembershipPackageParamsSchema
}),deleteMembershipPackage)

adminRouter.put('/edit-membership-package/:membershipPackageId',validate({
    body:editMembershipPackageBodySchema,params:editMembershipPackageParamsSchema
}),editMembershipPackage)


adminRouter.post('/sign-in',validate({
    body:adminSignInBodySchema
}),adminSignIn)

adminRouter.get('/sign-out',adminSignOut)


adminRouter.get('/get-user-profile',adminMiddleware,getAdminProfile)













export default adminRouter