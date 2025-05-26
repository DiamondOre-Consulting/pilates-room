import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import adminAxiosInstance from "@/Helper/axiosInstance";


export const adminSignin = createAsyncThunk("/admin/sign-in", async (data) => {
  try {
    const response = await adminAxiosInstance.post("/admin/sign-in", data);
    toast.success(response?.data?.message);

    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const adminLogout =  createAsyncThunk('/admin/log-out' ,async()=>{
  try {
    const response  = await adminAxiosInstance.get('/admin/sign-out');
    return response?.data;
    
  } catch (error) {
   console.log(error) 
  }
})

export const forgotPassword = createAsyncThunk(
  "/forgot-password",
  async (email) => {
    try {
      console.log(email)
      const response = await adminAxiosInstance.post("/admin/forgot-password", email);
      toast.success(response.data?.message);
      return response.data;
    } catch (err) {
      console.log(err)
      return toast.error(err?.response?.data?.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/reset-password",
  async ({ resetToken, newPassword }) => {
    try {
      const response = await adminAxiosInstance.post(
        `/admin/reset-password/${resetToken}`,
        { newPassword }
      );
      toast.success(response?.data?.message);
      return response.data;
    } catch (err) {
      return toast.error(err?.response?.data?.message);
    }
  }
);


export const changePassword = createAsyncThunk(
  "/user/change-password",
  async (newPassword) => {
    try {
      console.log(newPassword)
      const response = await adminAxiosInstance.post(
        `/admin/change-password/${newPassword}`
      );
      console.log(response);
      toast.success(response?.data?.message);
      return response?.data
     
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const adminData = createAsyncThunk('/admin/get-user-profile' , async()=>{
  try {
    const response = await adminAxiosInstance.get('/admin/get-user-profile')
    return response?.data
  } catch (error) {
    console.log(error)
  }
})


const authSlice = createSlice({
  name: "admin",
  initialState : null,
  reducers: {},
  extraReducers: (builder) => {
     
  },
});


export default authSlice.reducer