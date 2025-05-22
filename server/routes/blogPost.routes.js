import { Router } from 'express';
import {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostBySlug,
    updateBlogPost,
    deleteBlogPost,
    getFeaturedBlogPosts,
    searchBlogPosts
} from '../controllers/blogPost.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/')
    .post(upload(2).single("blogImage"), createBlogPost)
    .get(getAllBlogPosts);

router.get('/:slug', getBlogPostBySlug);

router.route('/:id')
    .patch(upload(2).single("blogImage"), updateBlogPost)
    .delete(deleteBlogPost);

router.get('/featured', getFeaturedBlogPosts);

router.get('/search', searchBlogPosts);


export default router; 