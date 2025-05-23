import Enquiry from '../models/enquiry.model.js';
import ApiError from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// Create new enquiry
const createEnquiry = asyncHandler(async (req, res) => {
    const { name, email, phone, message, topic } = req.body;

    if (!name || !email || !phone || !message || !topic) {
        throw new ApiError("All fields are required", 400);
    }

    const enquiry = await Enquiry.create({
        name,
        email,
        phone,
        message,
        topic
    });

    return res
        .status(201)
        .json(new ApiResponse(201, enquiry, "Enquiry created successfully"));
});

// Get all enquiries with pagination
const getAllEnquiries = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, topic } = req.query;
    const query = {};

    if (topic) {
        query.topic = topic;
    }

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 }
    };

    const enquiries = await Enquiry.find(query)
        .skip((options.page - 1) * options.limit)
        .limit(options.limit)
        .sort(options.sort);

    const total = await Enquiry.countDocuments(query);

    return res
        .status(200)
        .json(new ApiResponse(200, {
            enquiries,
            total,
            page: options.page,
            totalPages: Math.ceil(total / options.limit)
        }, "Enquiries retrieved successfully"));
});

// Get single enquiry by ID
const getEnquiryById = asyncHandler(async (req, res) => {
    const { enquiryId } = req.params;

    const enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
        throw new ApiError("Enquiry not found", 404);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, enquiry, "Enquiry retrieved successfully"));
});

// Update enquiry
const updateEnquiry = asyncHandler(async (req, res) => {
    const { enquiryId } = req.params;
    const { name, email, phone, message, topic } = req.body;

    const enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
        throw new ApiError("Enquiry not found", 404);
    }

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
        enquiryId,
        {
            $set: {
                ...(name && { name }),
                ...(email && { email }),
                ...(phone && { phone }),
                ...(message && { message }),
                ...(topic && { topic })
            }
        },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updatedEnquiry, "Enquiry updated successfully"));
});

// Delete enquiry
const deleteEnquiry = asyncHandler(async (req, res) => {
    const { enquiryId } = req.params;

    const enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
        throw new ApiError("Enquiry not found", 404);
    }

    await Enquiry.findByIdAndDelete(enquiryId);

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Enquiry deleted successfully"));
});

export {
    createEnquiry,
    getAllEnquiries,
    getEnquiryById,
    updateEnquiry,
    deleteEnquiry
};