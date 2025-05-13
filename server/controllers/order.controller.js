import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js"


// export const createOrder = asyncHandler(async()=>{

//        const userId = req.user._id;

//        const userWithCart = await User.findById(userId)
//                 .populate({
//                     path: 'cart.item',
//                     model: doc => doc.cart.itemType 
//                 });

//        if(!user.isMember){
             
          
//         const product = user.cart.items
             
            

//        }
//        else{

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