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
const authSlice = createSlice({
  name: "admin",
  initialState : null,
  reducers: {},
  extraReducers: (builder) => {
     
  },
});


export default authSlice.reducer