import mongoose from "mongoose";


const trainingSchema = new mongoose.Schema({

    title:{type:String,required:true},
    date:{type:Date,required:true},
    startTime:{type:String,required:true},
    endTime:{type:String,required:true},
    location:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    moreInfo:[{ title:String, description:String,
        uniqueId:String,
        image: {
        publicId:String,
        secureUrl:String
      }}],
    category:{
        type:String,
        enum:['teacherTraining','youMayAlsoLike']
    },
    available: { type: Boolean, default: true },
    thumbnail: {
        publicId: { type: String, required: true },
        secureUrl: { type: String, required: true }
      }


},{
    timestamps: true
})



const Training = mongoose.model('Training',trainingSchema)

export default Training



