
import asyncHandler from "../utils/asyncHandler.js"
import sendResponse from "../utils/sendResponse.js"
import Package from "../models/package.model.js"
import ApiError from "../utils/apiError.js"
import { fileDestroy, fileUpload } from "../utils/fileUpload.js"





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


export const getAllPackages = asyncHandler(async(req,res)=>{

    const limit = req.validatedData.query.limit || 20
    const page = req.validatedData.query.page || 1

   
    const [packagesResult,totalPackagesResult] = await Promise.allSettled([
        Package.find().skip((page-1)*limit).limit(limit),
        Package.countDocuments()
    ])

    if (packagesResult.status !== "fulfilled" || totalPackagesResult.status !== "fulfilled") {
        throw new Error("Failed to fetch packages or count");
    }

    const packages = packagesResult.value;
    const totalPackages = totalPackagesResult.value;

    sendResponse(res,200,packages,"Packages fetched successfully")
})


export const getSinglePackage = asyncHandler(async(req,res)=>{

    const singlePackage = await Package.findById(req.validatedData.params.packageId)
    if(!singlePackage){
        throw new ApiError("Package not found",404)
    }
    sendResponse(res,200,singlePackage,"Package fetched successfully")
})

export const deletePackage = asyncHandler(async(req,res)=>{

    const {packageId} = req.validatedData.params

    const deletedPackage = await Package.findByIdAndDelete(packageId)
    if(!deletedPackage){
        throw new ApiError("Package not found",404)
    }
    sendResponse(res,200,null,"Package deleted successfully")

})


export const editPackage = asyncHandler(async(req,res)=>{

    const {packageId} = req.validatedData.params

    const existingPackage = await Package.findById(packageId)
    if(!existingPackage){
        throw new ApiError("Package not found",404)
    }
    if (req.file&&existingPackage.image?.publicId) {
        await fileDestroy(existingPackage.image.publicId, "package");
    }

    if(req.file){
        const {publicId,secureUrl} = await fileUpload(req.file.buffer,"package")
        req.validatedData.body.image = {
                publicId,
                secureUrl
        };
    }
    
    Object.assign(existingPackage, req.validatedData.body);

    await existingPackage.save()
    sendResponse(res,200,existingPackage,"Package updated successfully")
})





