
import Training from "../models/traning.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { fileUpload } from "../utils/fileUpload.js";
import sendResponse from "../utils/sendResponse.js";
import { fileDestroy } from "../utils/fileUpload.js";





export const createTraining = asyncHandler(async(req,res)=>{
    
    
    const bodyData = req.validatedData.body
    let thumbnailUpload = null;
    if (req.files?.thumbnailImage?.[0]) {
        thumbnailUpload = await fileUpload(req.files.thumbnailImage[0].buffer, "training");
    }
       
    const newTraining = await Training.create({
        ...bodyData,
        moreInfo:[],
        thumbnail: {
            publicId: thumbnailUpload?.publicId,
            secureUrl: thumbnailUpload?.secureUrl,
        },
    })

  

    
    

    if(req.files?.trainingImage&&bodyData.moreInfo.length>0){
        if (req.files?.trainingImage.length !== bodyData.moreInfo.length) {
            throw new ApiError(400, "Mismatch between files and moreInfo count");
        }
       
       
        const uploads = await Promise.allSettled(
            req.files.trainingImage.map((file) => {
                return fileUpload(file.buffer, file.originalname, "training");
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

    const {trainingId} = req.validatedData.params
    const existingTraining = await Training.findById(trainingId)
    if(!existingTraining){
        throw new ApiError("Training not found",404)
    }
    const bodyData = {...req.validatedData.body}



    let thumbnailUpload = null;

    if (req.files?.thumbnailImage?.[0]) {
        if(existingTraining.thumbnail.publicId){
            await fileDestroy(existingTraining.thumbnail.publicId,"training");
        }
        thumbnailUpload = await fileUpload(req.files.thumbnailImage[0].buffer, "training");
        existingTraining.thumbnail = {
            publicId: thumbnailUpload?.publicId,
            secureUrl: thumbnailUpload?.secureUrl,
        }
    }

    let trainingImages=[]

    if(req.files?.trainingImage){      
        trainingImages = await Promise.allSettled(
            req.files.trainingImage.map((file) => {
                return fileUpload(file.buffer, file.originalname,"training");
            })
        )
    }

    bodyData.moreInfo.map((training)=>{

          const trainingExist = existingTraining.moreInfo.find(info => info.uniqueId === training.uniqueId);

          if(!trainingExist){
            const uploadedFile = trainingImages.find((image)=>{
                return image.value.uniqueId === training.uniqueId
            })
            if(uploadedFile){
                existingTraining.moreInfo.push({
                    ...training,
                    image:{
                        publicId:uploadedFile.value.publicId,
                        secureUrl:uploadedFile.value.secureUrl 
                    }
                })             
            }          
          }
          else{
            
            const uploadedFile = trainingImages.find((image)=>{
                return image.value.uniqueId === existingTraining.uniqueId
            })

            if(uploadedFile){
                trainingExist.title = training.title,
                trainingExist.description = training.description
                trainingExist.image.publicId = uploadedFile.value.publicId
                trainingExist.image.secureUrl = uploadedFile.value.secureUrl
            }
            else{
                trainingExist.title = training.title,
                trainingExist.description = training.description
            }
          }
    })

    delete bodyData.moreInfo;
    Object.assign(existingTraining, bodyData);
    await existingTraining.save();   
    sendResponse(res,200,existingTraining,"Training updated successfully")   
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


export const fetchMoreInfo = asyncHandler(async(req,res)=>{

    const {trainingId} = req.validatedData.params
    const training = await Training.findById(trainingId)
    if(!training){
        throw new ApiError("Training not found",404)
    }
    if (!training.moreInfo || training.moreInfo.length === 0) {
        throw new ApiError("No additional info available", 404);
    }
    sendResponse(res,200,training.moreInfo,"More info fetched successfully")
})
