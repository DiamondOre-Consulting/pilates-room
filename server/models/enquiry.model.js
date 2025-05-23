import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true
    },
    topic: {
        type: String,
        required: [true, "Topic is required"],
        enum: {
            values: ['teacherTraining', 'privateClass', 'contactUs'],
            message: "Topic must be either teacherTraining, privateClass, or contactUs"
        }
    }
}, {
    timestamps: true
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
