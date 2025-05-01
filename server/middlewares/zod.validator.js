import { z } from "zod";

const validate = (schemas) => (req, res, next) => {
  try {
      
      const validatedData = {};

      
      if(schemas.body){ 
        if (req.body.subCategory && typeof req.body.subCategory === "string") {
          req.body.subCategory = JSON.parse(req.body.subCategory);
        }
        if(req.body.weight && typeof req.body.weight === "string"){
          req.body.weight = JSON.parse(req.body.weight);
        }
        if(req.body.imagesToReplace && typeof req.body.imagesToReplace === "string"){
          req.body.imagesToReplace = JSON.parse(req.body.imagesToReplace);
        }
        if(req.body.imagesToDelete && typeof req.body.imagesToDelete === "string"){
          req.body.imagesToDelete = JSON.parse(req.body.imagesToDelete);
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