import Order from "../models/order.model.js";
import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js"
import ApiError from "../utils/apiError.js"
import Class from "../models/class.model.js";




export const createOrder = asyncHandler(async(req,res)=>{

    const userId = req.user.id
    const { classId } = req.validatedData.params

    const existingUser = await User.findById(userId).populate('memberShipPlan')

    if(!existingUser.isMember||!existingUser.isDiscovery||existingUser.isDiscovery){
        throw new ApiError("User is not a member",400)
    }

    const existingClass = await Class.findById(classId)

    if(!existingClass){
        throw new ApiError("Class not found",404)
    }


    const createOrder = await Order.create({
        user: userId,
        Product: classId,
        status: 'scheduled',
        scheduledDate: existingClass.date,
        price: userWithCart.cart.item.price,

    })

    existingUser.memberShipPlan.remainingSession = existingUser.memberShipPlan.remainingSession-1;
    if(!existingUser.memberShipPlan.startDate){
        existingUser.memberShipPlan.startDate = new Date();
        existingUser.memberShipPlan.expiryDate = new Date(existingUser.memberShipPlan.startDate.getTime() + existingUser.memberShipPlan.package.validity*7 * 24 * 60 * 60 * 1000);
    }

    sendResponse(res,200,createOrder,"Order created successfully")
})


