import Order from "../models/order.model.js";
import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js"



// export const createOrder = asyncHandler(async()=>{

//        const userId = req.user._id;
//        const paymentId = req.validatedData.body.paymentId

//        const userWithCart = await User.findById(userId)
//                 .populate({
//                     path: 'cart.item',
//                     model: doc => doc.cart.itemType 
//                 })
//                 .populate("memberShipPlan.package");

                
//         if(!userWithCart.isMember){

//            const payment = await razorpayInstance.payments.fetch(paymentId);
//            const paymentStatus = payment.status;

//                 if(userWithCart.cart.itemType === 'Package'){

//                             const order = await Order.create({
//                                 user: userId,
//                                 Product: {
//                                     item: userWithCart.cart.item._id,
//                                     itemType: userWithCart.cart.itemType
//                                 },
//                                 status: 'scheduled',
//                                 isMember: false,
//                                 price: userWithCart.cart.item.price,
//                                 paymentStatus: paymentStatus
//                             })
                    
//                 }
//           else{

             
//                     const order = await Order.create({
//                         user: userId,
//                         Product: {
//                             item: userWithCart.cart.item._id,
//                             itemType: userWithCart.cart.itemType
//                         },
//                         status: 'scheduled',
//                         scheduledDate: userWithCart.cart.item.date,
//                         isMember: false,
//                         price: userWithCart.cart.item.price,
//                         paymentStatus: paymentStatus
//                     }) 
          

//           }

       
            
             
            

//        }
//        else{

//                 if(userWithCart.memberShipPlan.startDate){
                    
//                      if()

//                 }
//                 else{

//                 }


                    

//        }


// })


export const addToCart = asyncHandler(async(req, res) => {
    const {id, itemType} = req.validatedData.params;    
    const user = await User.findById(req.user._id);
    user.cart = {
        item: id,
        itemType: itemType
    };
    await user.save();
    sendResponse(res, 200, user, "Item added to cart successfully");
});