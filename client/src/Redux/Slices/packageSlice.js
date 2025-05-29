import userAxiosInstance from "@/Helper/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getAllPackages = createAsyncThunk(
  "/user/get-package",
  async ({ page, limit }) => {
    try {
      const queryParams = new URLSearchParams();

      if (limit) queryParams.append("limit", limit);
      if (page) queryParams.append("page", page);

      const response = await userAxiosInstance.get(
        `/user/get-all-packages?${queryParams?.toString()}`
      );
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      return;
    }
  }
);

const packageSlice = createSlice({
  name: "package",
  initialState: null,
  reducers: {},
  extraReducers: () => { },
});

export default packageSlice.reducer;
