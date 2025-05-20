import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import adminAxiosInstance from "../../Helper/axiosInstance";

export const getAllOrders = createAsyncThunk(
  "/admin/getAllOrder",
  async ({ limit, page, date }) => {
    try {
      const queryParams = new URLSearchParams();

      if (limit) queryParams.append("limit", limit);
      if (page) queryParams.append("page", page);
      if (date) queryParams.append("date", date);
      console.log(1)
      const response = await adminAxiosInstance.get(`/admin/get-all-orders?${queryParams.toString()}`);
      console.log(response)
      return response?.data
    } catch (error) {
        console.log(error)
    }
  }
);



const orderSlice = createSlice({
  name: "order",
  initialState: null,
  reducers: {},
  extraReducers: () => {},
});


export default orderSlice.reducer