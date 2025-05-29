import userAxiosInstance from "@/Helper/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getRazorpaykey = createAsyncThunk(
  "/user/rezopay-key",
  async () => {
    try {
      const response = await userAxiosInstance.get("/user/key");
      console.log(response);
      // toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      return;
      // toast.error(error?.response?.data?.message);
    }
  }
);

export const checkOutPayment = createAsyncThunk(
  "/user/-check-out",
  async ({ membershipPackageId }) => {
    try {
      console.log("getting id ", membershipPackageId);
      const query = new URLSearchParams();
      if (membershipPackageId)
        query?.append("membershipPackageId", membershipPackageId);
      const response = await userAxiosInstance.post(
        `/user/checkout-payment?${query?.toString()}`
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      return;
      toast.error(error?.response?.data?.message);
    }
  }
);

export const varifyPayment = createAsyncThunk(
  "/user/varifypayment",
  async (data) => {
    console.log(data)
    try {
      const response = await userAxiosInstance.post(
        "/user/verify-payment",
        data
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return;
    }
  }
);

export const createMembership = createAsyncThunk('/user/create-order', async ({ membershipPackageId, paymentId }) => {
  try {
    const response = await userAxiosInstance.post(`/user/buy-membership/${membershipPackageId}/${paymentId}`);
    console.log(response);
    toast?.success(response?.data?.message)
    return response?.data
  } catch (error) {
    return
  }
})


export const createOrderForClassBooking = createAsyncThunk('/user/create-order', async (data) => {
  try {
    console.log("dataaaaaaaaaaaaaa in creating ", data?.date)
    const response = await userAxiosInstance.post(`/user/create-order/${data?.classId}`, data);
    toast.success(response?.data?.message)
    return response?.data
    console.log(response);
  } catch (error) {
    return
    return error
  }
})

export const cancelOrder = createAsyncThunk('/user/cancel-order', async (orderId) => {
  try {
    const response = await userAxiosInstance.put(`/user/cancel-order/${orderId}`);
    console.log(response)
    return response?.data
  } catch (error) {
    return
  }
})




const paymentSlice = createSlice({
  name: "payment",
  initialState: null,
  reducers: {},
  extraReducers: () => { },
});

export default paymentSlice.reducer;
