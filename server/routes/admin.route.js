import  {Router} from "express"
import { adminMiddleware } from "../middlewares/admin.middleware.js"
import { createClass, getClasses } from "../controllers/admin/class.admin.controller.js"
import { createClassBodySchema } from "../validator/admin/createClass.validator.js"
import { upload } from "../middlewares/multer.middleware.js"
import validate from "../middlewares/zod.validator.js"
import { getClassesQuerySchema } from "../validator/admin/getClasses.validator.js"


const adminRouter = Router()



adminRouter.post('/create-class',upload(1).fields([{ name: "image", maxCount: 4 }, { name: "instructor.image", maxCount:1}]),validate({
   body:createClassBodySchema
}),createClass)

adminRouter.get('/get-classes',validate({
    query:getClassesQuerySchema
}),getClasses)



export default adminRouter