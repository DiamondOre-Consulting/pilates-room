import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type:String,required:true},  
  instructor: {name: String,image:{publicId:String, secureUrl: String}},
  location: {type:String,required:true},
  date: {type:Date,required:true},
  time: {type:String,required:true},
  duration: {type:String,required:true},
  price: {type:Number,required:true},
  capacity: {type:Number,required:true},
  enrolledCount: { type: Number, default: 0 },
  image: [{publicId:String, secureUrl: String}],
  available: { type: Boolean, default: true }, 
},{
    timestamps: true
});

const Class = mongoose.model('Class', classSchema);

export default Class


