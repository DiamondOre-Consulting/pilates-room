import Class from "../../models/class.model.js";
import asyncHandler from "../../utils/asyncHandler.js"
import { fileUpload } from "../../utils/fileUpload.js";
import sendResponse from "../../utils/sendResponse.js"
import ApiError from "../../utils/apiError.js"  





export const createClass = asyncHandler(async(req,res)=>{

      const {title,description,location,date,time,price,capacity,enrolledCount,available,duration} = req.validatedData.body

      if (!req.files?.["instructor.image"]){
        throw new ApiError("Instructor image is required",400);
      }
      

      const newClass = await Class.create({
          duration,
          title,
          description,
          location,
          date,
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
  
    const limit = req.validatedData.query.limit || 10
    const page = req.validatedData.query.page || 1

    const location = req.validatedData.query.location
    const date = req.validatedData.query.date

    const query = {}
    if(location){
        query.location = location
    }
    if(date){
        query.date = date
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
     
    const updatedClass = await Class.findByIdAndUpdate(classId,req.validatedData.body,{new:true})

    sendResponse(res,200,updatedClass,"Class updated successfully")

})