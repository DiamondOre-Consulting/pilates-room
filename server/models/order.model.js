import { model, Schema } from "mongoose"

const orderSchema = new Schema({
    
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    Product:{
        item:{
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'product.itemType'
        },
        itemType:{
            type: String,
            enum: ['Package', 'Class', 'Training']
        }
    },
    status:{
        type:String,
        enum:["scheduled","pending","completed","cancelled"],
        default:"scheduled"
    },
    scheduledDate:Date,
    cancelledDate:Date,
    isMember:Boolean,
    price:Number,
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    

}, {
    timestamps: true
})

const Order = model("Order", orderSchema)

export default Order