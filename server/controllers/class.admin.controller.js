import Class from "../models/class.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import { fileUpload } from "../utils/fileUpload.js";
import sendResponse from "../utils/sendResponse.js"
import ApiError from "../utils/apiError.js"  
import { fileDestroy } from "../utils/fileUpload.js";
import User from "../models/user.model.js";






export const createClass = asyncHandler(async(req,res)=>{

      const {title,description,location,weeks,time,price,capacity,enrolledCount,available,duration} = req.validatedData.body

      

      if (!req.files?.["instructor.image"]){
        throw new ApiError("Instructor image is required",400);
      }
      

      const newClass = await Class.create({
          duration,
          title,
          description,
          location,
          weeks,
          time,
          price,
          capacity,
          enrolledCount,
          available
      })



      if(req.files?.["instructor.image"][0]?.buffer){   
          const {publicId,secureUrl} = await fileUpload(req.files["instructor.image"][0].buffer,"instructor")     
          newClass.instructor = {name:req.validatedData.body.instructorName, image:{publicId, secureUrl}}
      }


      if(req.files?.image) {
           
          const result = await Promise.allSettled(
            req.files.image.map((file) => {
              return fileUpload(file.buffer, "class");
            })
          )

          const successfulUploads = result.filter((result)=>{
            return result.status === "fulfilled"
          }).map((result)=>{
            return result.value
          })
          
          newClass.image.push(...successfulUploads)         
        }
        
        await newClass.save()

        sendResponse(res,200,newClass,"Class created successfully")

})


export const getClasses = asyncHandler(async(req,res)=>{
  
    const limit = req.validatedData.query.limit || 20
    const page = req.validatedData.query.page || 1

    const location = req.validatedData.query.location
    const week = req.validatedData.query.week

    const query = {}
    if(location){
        query.location = location
    }
    if(week){
        query.weeks = week
    }
    
    


    const [classesResult,totalClassesResult] = await Promise.allSettled([
        Class.find(query).skip((page-1)*limit).limit(limit),
        Class.countDocuments()
    ])

    if (classesResult.status !== "fulfilled" || totalClassesResult.status !== "fulfilled") {
        throw new Error("Failed to fetch classes or count");
    }

    const classes = classesResult.value;
    const totalClasses = totalClassesResult.value;

    sendResponse(res,200,{classes,totalClasses},"Total classes fetched successfully")

})


export const deleteClass = asyncHandler(async(req,res)=>{

    const {classId} = req.validatedData.params

    const deletedClass = await Class.findByIdAndDelete(classId)

    if(!deletedClass){
        throw new ApiError("Class not found",400)
    }

    sendResponse(res,200,null,"Class deleted successfully")
})


export const editClass = asyncHandler(async(req,res)=>{

    const {classId} = req.validatedData.params


    const existingClass = await Class.findById(classId)

    if(!existingClass){
        throw new ApiError("Class not found",400)
    }
     
    
    if(req.validatedData.body.instructorName){
        console.log("enter")
        existingClass.instructor.name = req.validatedData.body.instructorName
        const {instructorName,...rest} = req.validatedData.body
        req.validatedData.body = rest
    }

    Object.assign(existingClass, req.validatedData.body);


    if(req.files?.["instructor.image"]?.[0]?.buffer){

        if(existingClass.instructor.image.publicId){
            await fileDestroy(existingClass.instructor.image.publicId,"instructor")
        }

        const {publicId,secureUrl} = await fileUpload(req.files["instructor.image"][0].buffer,"instructor")
        existingClass.instructor.image.publicId = publicId
        existingClass.instructor.image.secureUrl = secureUrl
    }

    if(req.files?.["image"]) {

        if (existingClass.image.length > 0) {
            await Promise.allSettled(
              existingClass.image.map((img) => fileDestroy(img.publicId, "class"))
            );
        }
        

        const result = await Promise.allSettled(
          req.files.image.map((file) => {
            return fileUpload(file.buffer, "class");
          })
        )
    
        const successfulUploads = result.filter((result)=>{
          return result.status === "fulfilled"
        }).map((result)=>{
          return result.value
        })
        
        existingClass.image.push(...successfulUploads)         
      }


    


    await existingClass.save();
    
    sendResponse(res,200,existingClass,"Class updated successfully")

})


export const getScheduledClass = asyncHandler(async(req,res)=>{
      
      const userId = req.user._id

      const user = await User.findById(userId).populate({
        path: 'upcomingSchedule.item',
        model: 'Order',
        populate: {
          path: 'product',
          model: 'Class'
        }
      });

      const currentDate = new Date()




      user.upcommingSchedule = user.upcomingSchedule.filter((schedule)=>{
          
      })
     
      sendResponse(res,200,user.upcomingSchedule,"Scheduled classes fetched successfully")

})




