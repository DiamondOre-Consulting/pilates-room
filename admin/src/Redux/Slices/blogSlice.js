import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import adminAxiosInstance from "../../Helper/axiosInstance";

export const createBlog = createAsyncThunk(
    "/admin/create-blog",
    async (formData) => {
        try {
            const response = await adminAxiosInstance.post(
                "/blog",
                formData
            );
            toast.success(response?.data?.message);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);

export const getAllBlogs = createAsyncThunk(
    "/admin/all-blogs",
    async ({ page, limit }) => {
        try {
            const queryParams = new URLSearchParams();
            if (limit) queryParams.append("limit", limit);
            if (page) queryParams.append("page", page);

            const response = await adminAxiosInstance.get(
                `/blog?${queryParams?.toString()}`
            );
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);

export const deleteBlog = createAsyncThunk(
    "/admin/delete-blog",
    async (id) => {
        try {
            const response = await adminAxiosInstance.delete(
                `/blog/${id}`
            );
            toast.success(response?.data?.message);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);

export const editBlog = createAsyncThunk(
    '/admin/edit-blog',
    async ({ id, formData }) => {
        try {
            const response = await adminAxiosInstance.patch(
                `/blog/${id}`,
                formData
            );
            toast.success(response?.data?.message);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);

const blogSlice = createSlice({
    name: "blog",
    initialState: null,
    reducers: {},
    extraReducers: () => { },
});

export default blogSlice.reducer; 