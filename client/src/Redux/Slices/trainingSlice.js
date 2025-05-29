import userAxiosInstance from "@/Helper/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getAllTrainings = createAsyncThunk(
  "/admin/create-all-trainings",
  async () => {
    try {
      const response = await userAxiosInstance.get("/admin/get-all-trainings");
      return response?.data;
    } catch (error) {
      return;
    }
  }
);

export const getSingleTraining = createAsyncThunk(
  "/user-single-training",
  async ({ id }) => {
    try {
      const response = await userAxiosInstance.get(
        `/admin/get-single-training/${id}`
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      return;
    }
  }
);
const trainingSlice = createSlice({
  name: "training",
  initialState: null,
  reducers: {},
  extraReducers: () => { },
});

export default trainingSlice.reducer;
