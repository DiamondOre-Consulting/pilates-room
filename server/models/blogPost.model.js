import { Schema } from "mongoose";
import mongoose from "mongoose";

const blogPostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        content: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
            maxlength: 200,
        },
        featuredImage: {
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                required: true,
            }
        },
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft',
        },
        readingTime: {
            type: Number,
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        publishedAt: {
            type: Date,
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Index for better search performance
blogPostSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ status: 1 });

// Virtual for URL
blogPostSchema.virtual('url').get(function () {
    return `/blog/${this.slug}`;
});

// Pre-save middleware to generate slug from title if not provided
blogPostSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-');
    }

    // Calculate reading time (assuming average reading speed of 200 words per minute)
    if (this.isModified('content')) {
        const wordCount = this.content.trim().split(/\s+/).length;
        this.readingTime = Math.ceil(wordCount / 200);
    }

    // Set publishedAt when status changes to published
    if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
        this.publishedAt = new Date();
    }

    next();
});

// Method to increment views
blogPostSchema.methods.incrementViews = async function () {
    this.views += 1;
    return this.save();
};

// Method to add a comment
blogPostSchema.methods.addComment = async function (userId, content) {
    this.comments.push({
        user: userId,
        content,
        createdAt: new Date()
    });
    return this.save();
};

// Static method to find featured posts
blogPostSchema.statics.findFeatured = function () {
    return this.find({ isFeatured: true, status: 'published' })
        .sort({ publishedAt: -1 });
};

export default mongoose.model("BlogPost", blogPostSchema); 