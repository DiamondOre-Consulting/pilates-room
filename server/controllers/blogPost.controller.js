import BlogPost from '../models/blogPost.model.js';
import ApiError from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { fileUpload } from '../utils/fileUpload.js';

const createBlogPost = asyncHandler(async (req, res) => {
    const { title, content, slug, excerpt, status, isFeatured } = req.body;

    if (!title || !content || !excerpt) {
        throw new ApiError("All required fields must be provided", 400);
    }

    if (slug) {
        const existingBlog = await BlogPost.findOne({ slug });
        if (existingBlog) {
            throw new ApiError("Slug already exists", 400);
        }
    }

    const blogImage = await fileUpload(req?.file?.buffer, "blogImage", "blog");

    console.log(blogImage)

    const blogPost = await BlogPost.create({
        title,
        content,
        excerpt,
        slug,
        featuredImage: {
            url: blogImage.secureUrl,
            publicId: blogImage.publicId
        },
        status: status || 'draft',
        isFeatured: isFeatured || false
    });

    return res
        .status(201)
        .json(new ApiResponse(201, blogPost, "Blog post created successfully"));
});

const getAllBlogPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, status, isFeatured } = req.query;
    const query = {};

    if (status) query.status = status;
    if (isFeatured) query.isFeatured = isFeatured === 'true';

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 }
    };

    const blogPosts = await BlogPost.find(query)
        .skip((options.page - 1) * options.limit)
        .limit(options.limit)
        .sort(options.sort);

    const total = await BlogPost.countDocuments(query);

    return res
        .status(200)
        .json(new ApiResponse(200, {
            blogPosts,
            total,
            page: options.page,
            totalPages: Math.ceil(total / options.limit)
        }, "Blog posts retrieved successfully"));
});

const getBlogPostBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const blogPost = await BlogPost.findOne({ slug });

    if (!blogPost) {
        throw new ApiError("Blog post not found", 404);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, blogPost, "Blog post retrieved successfully"));
});

const updateBlogPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, excerpt, slug, status, isFeatured } = req.body;

    if (slug) {
        const existingBlog = await BlogPost.findOne({ slug });
        if (existingBlog && existingBlog?._id?.toString() !== id) {
            throw new ApiError("Slug already exists", 400);
        }
    }

    const blogPost = await BlogPost.findOne({ _id: id });

    if (!blogPost) {
        throw new ApiError("Blog post not found", 404);
    }

    const uploadImage = req.file ? await fileUpload(req?.file?.buffer, "blogImage", "blog") : null;

    const updatedBlogPost = await BlogPost.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                ...(title && { title }),
                ...(content && { content }),
                ...(excerpt && { excerpt }),
                ...(slug && { slug }),
                ...(uploadImage && { featuredImage: { url: uploadImage.secureUrl, publicId: uploadImage.publicId } }),
                ...(status && { status }),
                ...(isFeatured !== undefined && { isFeatured })
            }
        },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updatedBlogPost, "Blog post updated successfully"));
});

const deleteBlogPost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blogPost = await BlogPost.findOne({ _id: id });

    if (!blogPost) {
        throw new ApiError("Blog post not found", 404);
    }

    await BlogPost.deleteOne({ _id: id });

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Blog post deleted successfully"));
});

const getFeaturedBlogPosts = asyncHandler(async (req, res) => {
    const featuredPosts = await BlogPost.findFeatured();

    return res
        .status(200)
        .json(new ApiResponse(200, featuredPosts, "Featured blog posts retrieved successfully"));
});

const searchBlogPosts = asyncHandler(async (req, res) => {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
        throw new ApiError("Search query is required", 400);
    }

    const searchResults = await BlogPost.find(
        { $text: { $search: query } },
        { score: { $meta: "textScore" } }
    )
        .sort({ score: { $meta: "textScore" } })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

    const total = await BlogPost.countDocuments({ $text: { $search: query } });

    return res
        .status(200)
        .json(new ApiResponse(200, {
            results: searchResults,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        }, "Search results retrieved successfully"));
});

export {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostBySlug,
    updateBlogPost,
    deleteBlogPost,
    getFeaturedBlogPosts,
    searchBlogPosts
}; 