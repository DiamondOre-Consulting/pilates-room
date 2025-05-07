
import Training from "../models/traning.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { fileUpload } from "../utils/fileUpload.js";
import sendResponse from "../utils/sendResponse.js";





export const createTraining = asyncHandler(async(req,res)=>{

    
     
    const bodyData = req.validatedData.body

       
    const newTraining = await Training.create({
        ...bodyData,
        moreInfo:[]
    })


    if(req.files&&bodyData.moreInfo.length>0){
        if (req.files.length !== bodyData.moreInfo.length) {
            throw new ApiError(400, "Mismatch between files and moreInfo count");
        }
       
        const uploads = await Promise.allSettled(
            req.files.map((file) => {
                fileUpload(file.buffer, "training");
            })
        )

        newTraining.moreInfo = bodyData.moreInfo.map((info,index)=>({
          
                ...info,
                image: {
                    publicId:uploads[index].value.publicId,
                    secureUrl:uploads[index].value.secureUrl 
                }
            
        }))

        await newTraining.save();

    }
    

    sendResponse(res,200,newTraining,"Training created successfully")
   

})