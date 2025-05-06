
import asyncHandler from "../../utils/asyncHandler.js"
import sendResponse from "../../utils/sendResponse.js"
import Package from "../../models/package.model.js"
import ApiError from "../../utils/apiError.js"
import { fileUpload } from "../../utils/fileUpload.js"




export const createPackage = asyncHandler(async(req,res)=>{

    if(!req.file){
        throw new ApiError("Image is required",400)
    }




   
    const {publicId,secureUrl} = await fileUpload(req.file.buffer,"package")
    req.validatedData.body.image = {
        publicId,
        secureUrl
    };
    

    const newPackage = await Package.create(req.validatedData.body)
    sendResponse(res,200,newPackage,"Package created successfully")

})

