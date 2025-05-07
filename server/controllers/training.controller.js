
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
                return fileUpload(file.buffer, "training");
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


export const getTrainings = asyncHandler(async(req,res)=>{

    const category = req.validatedData.query.category
     
    const query = {}
    if(category){
        query.category = category
    }
    const trainings = await Training.find(query).sort({createdAt:-1}).lean()
    sendResponse(res,200,trainings,"Trainings fetched successfully")
})

export const getSingleTraining = asyncHandler(async(req,res)=>{

    const singleTraining = await Training.findById(req.validatedData.params.trainingId).lean()
    if(!singleTraining){
        throw new ApiError("Training not found",404)
    }
    sendResponse(res,200,singleTraining,"Training fetched successfully")

})



export const editTraining = asyncHandler(async(req,res)=>{

})

export const deleteTraining = asyncHandler(async(req,res)=>{

    const {trainingId} = req.validatedData.params



    const training = await Training.findById(trainingId)

    if(!training){
        throw new ApiError("Training not found",404)
    }

    if(training.moreInfo.length>0){
        await Promise.allSettled(
            training.moreInfo.map(async(info) => {
                await cloudinary.uploader.destroy(info.image.publicId);
            })
        )
    }

    await Training.findByIdAndDelete(trainingId)
   
    sendResponse(res,200,null,"Training deleted successfully")

})


