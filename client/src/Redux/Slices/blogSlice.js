import userAxiosInstance from "@/Helper/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";


export const getBlogs = createAsyncThunk("/user/get-blogs" , async()=>{
    try {
        const response = await userAxiosInstance.get('/blog/')
        console.log(response);
        toast.success(response?.data?.message)
        return response.data

    } catch (error) {
        console.log(error)
    }
})



export const getBlogPostBySlug = createAsyncThunk('/user/slug' , async(slug)=>{
    try {
        console.log(slug)
        const response = await userAxiosInstance.get(`/blog/${slug}`);
        return response?.data
    } catch (error) {
        console.log(error)
    }
})

const blogSlice  = createSlice({
    name:"blog",
    initialState :null,
    reducers :{},
    extraReducers :()=>{

    }
})

export default blogSlice.reducer