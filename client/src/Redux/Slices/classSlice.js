import userAxiosInstance from "@/Helper/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getAllClasses = createAsyncThunk(
  "/admin/all-class",
  async ({ location, week  , limit , page}) => {
    try {
      console.log("data is ", location, week , limit , page );
      const queryParams = new URLSearchParams();

      
      if (limit) queryParams.append("limit", limit);
      if (page) queryParams.append("page", page);
      if (location) queryParams.append("location", location);
      if (week) queryParams.append("week", week);
      const response = await userAxiosInstance.get(
        `/user/get-classes?${queryParams?.toString()}`
      );
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

const classSlice = createSlice({
  name: "class",
  initialState: null,
  reducers: {},
  extraReducers: () => {},
});

export default classSlice.reducer;
