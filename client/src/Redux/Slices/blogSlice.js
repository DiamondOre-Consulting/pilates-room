import userAxiosInstance from "@/Helper/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getBlogs = createAsyncThunk("/user/get-blogs", async () => {
  try {
    const response = await userAxiosInstance.get("/blog/");
    response?.data?.message && toast.success(response?.data?.message);
    return response.data;
  } catch (error) {
    return;
  }
});

export const getBlogPostBySlug = createAsyncThunk(
  "/user/slug",
  async (slug) => {
    try {
      const response = await userAxiosInstance.get(`/blog/${slug}`);
      return response?.data;
    } catch (error) {
      return;
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: null,
  reducers: {},
  extraReducers: () => {},
});

export default blogSlice.reducer;
