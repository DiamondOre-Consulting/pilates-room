import  {Router} from "express"
import { adminMiddleware } from "../middlewares/admin.middleware.js"
import { createClass, deleteClass, editClass, getClasses } from "../controllers/class.admin.controller.js"
import { createClassBodySchema, getClassesQuerySchema, deleteClassParamsSchema, editClassBodySchema, editClassParamsSchema } from "../validator/class.validator.js"
import { upload } from "../middlewares/multer.middleware.js"
import validate from "../middlewares/zod.validator.js"
import { createPackage, deletePackage, editPackage, getAllPackages, getSinglePackage } from "../controllers/package.admin.controller.js"
import { createPackageBodySchema, deletePackageParamsSchema, editPackageBodySchema, editPackageParamsSchema, getAllPackagesQuerySchema, getSinglePackageParamsSchema } from "../validator/package.validator.js"


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


adminRouter.post('/create-package',upload(2).single("packageImage"),validate({
    body:createPackageBodySchema
}),createPackage)

adminRouter.get('/get-all-packages',validate({
    query:getAllPackagesQuerySchema
}),getAllPackages)


adminRouter.get('/get-single-package/:packageId',validate({
    params:getSinglePackageParamsSchema
}),getSinglePackage)


adminRouter.delete('/delete-package/:packageId',validate({
    params:deletePackageParamsSchema
}),deletePackage)

adminRouter.put('/edit-package/:packageId',upload(2).single("packageImage"),validate({
    body:editPackageBodySchema, params:editPackageParamsSchema
}),editPackage)



export default adminRouter