import MembershipPackage from "../models/membershipPackage.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js"
import ApiError from "../utils/apiError.js"



// export const createOrder = asyncHandler(async(req,res)=>{

//     const userId = req.user.id
//     const { membershipPackageId } = req.validatedData.query

//     const existingUser = await User.findById(userId)

//     if(!existingUser.isMember||!existingUser.isDiscovery){
//         throw new ApiError("User is not a member",400)
//     }

//     const membershipPackage = await MembershipPackage.findById(membershipPackageId)

//     if(!membershipPackage){
//         throw new ApiError("Membership package not found",404)
//     }


//     const createOrder = await Order.create({
//         user: userId,
//         Product: {
//             item: membershipPackageId,
//             itemType: userWithCart.cart.itemType
//         },
//         status: 'scheduled',
//         isMember: false,
//         price: userWithCart.cart.item.price,
//         paymentStatus: paymentStatus

//     })

//     sendResponse(res,200,createOrder,"Order created successfully")
// })


