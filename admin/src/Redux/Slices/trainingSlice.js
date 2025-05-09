import adminAxiosInstance from "@/Helper/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const createTraining = createAsyncThunk(
  "/admin/create-training",
  async (formData) => {
    try {
      const response = await adminAxiosInstance.post(
        "/admin/create-training",
        formData
      );
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllTrainings = createAsyncThunk(
  "/admin/create-all-trainings",
  async () => {
    try {
      const response = await adminAxiosInstance.get("/admin/get-all-trainings");
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteTraining = createAsyncThunk(
  "/admin/delete-training",
  async (id) => {
    try {
      const response = await adminAxiosInstance.delete(
        `/admin/delete-training/${id}`
      );
      console.log(response);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const editTraining = createAsyncThunk(
  "/admin/edit-training",
  async ({ id , formData }) => {
    try {
      console.log("inslice ", id );
      const response = await adminAxiosInstance.put(
        `/admin/edit-training/${id}`,
        formData
      );
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

const trainingSlice = createSlice({
  name: "training",
  initialState: null,
  reducers: {},
  extraReducers: () => {},
});

export default trainingSlice.reducer;
