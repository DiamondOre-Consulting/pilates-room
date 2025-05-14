import Order from "../models/order.model.js";
import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js"



export const createOrder = asyncHandler(async(req,res)=>{

    const userId = req.user.id
    const { membershipPackageId } = req.validatedData.query

    


})


