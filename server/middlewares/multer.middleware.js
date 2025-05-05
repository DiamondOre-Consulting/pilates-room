import multer, { memoryStorage } from "multer"


const imageStorage = multer.memoryStorage()


const allowedImageMimeTypes = [
    "image/jpeg",  
    "image/png",   
    "image/gif",   
    "image/webp",  
    "image/tiff",  
    "image/bmp",   
    "image/svg+xml", 
  ];

export const upload =(size)=>{ return multer({
    storage: imageStorage,
    limits :{ fileSize: size * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        if (!allowedImageMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Only image files are allowed"));
        }
        cb(null, true);
    }
})}

