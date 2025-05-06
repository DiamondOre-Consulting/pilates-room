import mongoose from "mongoose"


const packageSchema = new mongoose.Schema({


    title:{type:String,required:true},
    sessionInfo:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    image: {
        publicId: { type: String, required: true },
        secureUrl: { type: String, required: true }
    },
    available: { type: Boolean, default: true },
    
})


const Package = mongoose.model('Package',packageSchema)

export default Package