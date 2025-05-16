import { model, Schema } from "mongoose"

const orderSchema = new Schema({
    
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Class"
    },
    status:{
        type:String,
        enum:["scheduled","pending","completed","cancelled"],
        default:"scheduled"
    },
    scheduledDate:Date,
    cancelledDate:Date,

}, {
    timestamps: true
})

const Order = model("Order", orderSchema)

export default Order