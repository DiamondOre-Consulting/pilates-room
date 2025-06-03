import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import adminAxiosInstance from "@/Helper/axiosInstance";

export const getAllUsers = createAsyncThunk(
  "/admin/get-all-users",
  async ({ page, limit, searchTerm }) => {
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("searchTerm", searchTerm);
      if (page) queryParams.append("page", page);
      if (limit) queryParams.append("limit", limit);
      const response = await adminAxiosInstance.get(
        `/admin/get-all-users?${queryParams?.toString()}`
      );

      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEnquries = createAsyncThunk(
  "/user/get-enquries",
  async ({ page, limit, topic }) => {
    try {
      console.log("data in slice", page, limit, topic);
      const queryParams = new URLSearchParams();
      if (page) queryParams.append("page", page);
      if (limit) queryParams.append("limit", limit);
      if (topic) queryParams.append("topic", topic);

      const response = await adminAxiosInstance.get(
        `/admin/enquiry?${queryParams?.toString()}`
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEnquiryById = createAsyncThunk(
  "/admin/get-enquiry-buId",
  async (id) => {
    try {
      const response = await adminAxiosInstance.get(`/admin/enquiry/${id}`);
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const dashboardStats = createAsyncThunk(
  "/admin/dashboard-stats",
  async () => {
    try {
      const response = await adminAxiosInstance.get("/admin/dashboard-stats");
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const extendExpiry = createAsyncThunk(
  "/admin/extend-expiry",
  async ({ id, expiryDate }) => {
    console.log("auth", id, "expirydate", expiryDate);
    try {
      const response = await adminAxiosInstance.put(
        `/admin/edit-user-membership/${id}`,
        { expiryDate: expiryDate }
      );
      console.log(response);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: null,
  reducers: {},
  extraReducers: () => {},
});

export default adminSlice.reducer;
