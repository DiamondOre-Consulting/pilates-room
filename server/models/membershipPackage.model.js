import mongoose from "mongoose"


const membershipPackageSchema = new mongoose.Schema({
    packageName:{
        type:String,
        required:true
    },
    validity:{
        type:Number,
        required:true
    },
    totalSessions:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    perSessionPrice:{
        type:Number,
        required:true
    },
    description:{
       type:String,
       required:true
    },
    packageType : {
        type:String,
        enum:["monthly","quarterly","discovery"],
        required:true
    },
    available: { type: Boolean, default: true },
     
})

const MembershipPackage = mongoose.model('MembershipPackage',membershipPackageSchema)

export default MembershipPackage