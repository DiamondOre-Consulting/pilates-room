import Order from "../models/order.model.js";
import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js"
import ApiError from "../utils/apiError.js"
import Class from "../models/class.model.js";


export const createOrder = asyncHandler(async(req,res)=>{

    const userId = req.user.id
    const { classId } = req.validatedData.params
    const existingUser = await User.findById(userId).populate('memberShipPlan.package')

    if(!existingUser.isMember||!existingUser.isDiscovery){
        throw new ApiError("User is not a member",400)
    }

    const {date} = req.validatedData.body

    const existingClass = await Class.findById(classId)

    if(!existingClass){
        throw new ApiError("Class not found",404)
    }
    const createOrder = await Order.create({
        user: userId,
        product: classId,
        status: 'scheduled',
        scheduledDate: date,
    })

    existingUser.upcomingSchedule.push({ item: createOrder._id });

    

    existingUser.memberShipPlan.remainingSession = existingUser.memberShipPlan.remainingSession-1;
    if(!existingUser.memberShipPlan.startDate){
        existingUser.memberShipPlan.startDate = new Date();
        existingUser.memberShipPlan.expiryDate = new Date(existingUser.memberShipPlan.startDate.getTime() + existingUser.memberShipPlan.package.validity*7 * 24 * 60 * 60 * 1000);
    }

    await existingUser.save()

    sendResponse(res,200,createOrder,"Order created successfully")
})



export const cancelOrder = asyncHandler(async(req,res)=>{
    
    const userId = req.user._id;

    const {orderId} = req.validatedData.params

    const existingOrder = await Order.findById(orderId)

    if(!existingOrder){
        throw new ApiError("Order not found",404)
    }

    const scheduledDate = new Date(existingOrder.scheduledDate);
    const today = new Date();

   
    scheduledDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (scheduledDate.getTime() <= today.getTime()) {
    throw new ApiError("Order cannot be cancelled on the scheduled date or after", 400);
    }

    const existingUser = await User.findById(userId)

    console.log(existingOrder.product.toString())
    console.log(existingUser.upcomingSchedule)

    existingUser.upcomingSchedule = existingUser.upcomingSchedule.filter(
        s => s.item.toString() !== existingOrder.product._id.toString()
      );

    existingUser.remainingSession = existingUser.remainingSession+1;
    existingUser.memberShipPlan.remainingSession = existingUser.memberShipPlan.remainingSession+1;
    existingOrder.status = "cancelled"
    await existingOrder.save();
    sendResponse(res,200,null,"Order cancelled successfully")

})


export const orderHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;     
    const orderHistory = await Order.find({ user: userId }).populate('product');    
    if (!orderHistory || orderHistory.length === 0) {
        throw new ApiError("Order not found", 404);
    }
    sendResponse(res, 200, orderHistory, "Order history");
});





