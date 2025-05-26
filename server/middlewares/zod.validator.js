import { z } from "zod";
import ApiError from "../utils/apiError";

const validate = (schemas) => (req, res, next) => {
  try {
      
      const validatedData = {};
      
      console.log("bodyyyyyyyyyy",req?.body)
      
      if(schemas.body && req.body) {
        if (req.body.moreInfo && Array.isArray(req.body.moreInfo)) {
          req.body.moreInfo = req.body.moreInfo.map(item =>
            typeof item === 'string' ? JSON.parse(item) : item
          );
         }
         if (typeof req.body.weeks === 'string') {
              try {
                req.body.weeks = JSON.parse(req.body.weeks);
              } catch (e) {
               throw new ApiError("Invalid weeks format", 400);
              }
          }


        validatedData.body = schemas.body.parse(req.body);
      }
      if(schemas.params){
     
        validatedData.params = schemas.params.parse(req.params);
      }
      if(schemas.query){
        validatedData.query = schemas.query.parse(req.query);
      }
      if(schemas.file) {   
        validatedData.file = schemas.file.parse(req.file);       
      }
      if(schemas.files) {       
       
        validatedData.files = schemas.files.parse(req.files);
      }    
      req.validatedData = validatedData;
      next(); 
  } catch (error) {
      console.log(error)
      if (error instanceof z.ZodError) {
          return res.status(400).json({
              success: false,
              errors: error.errors.map(err => ({
                  field: err.path[0],
                  message: err.message
              }))
          });
      }
      next(error); 
  }
};

export default validate;