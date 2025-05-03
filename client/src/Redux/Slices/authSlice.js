import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import userAxiosInstance from "../../Helper/axiosInstance";


const initialState = {
    user: {},
    isLoggedIn: false,
  };

  export const sendOtp = createAsyncThunk("/user/send-otp", async (data) => {
    try {
      console.log(data);
      const response = await userAxiosInstance.post("/user/send-otp", {
        email: data.email,
      });
      console.log(response);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });


  export const userSignUp = createAsyncThunk("/user/signup", async (data) => {
    try {
      console.log(data);
      const response = await userAxiosInstance.post("/user/signup", data);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });



export const userSignIn = createAsyncThunk('/user/sign-in' , async(data)=>{
    try{
        const response = await userAxiosInstance.post('/user/signin' , data);
        toast.success(response?.data?.message);
        return response?.data
    }
    catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message)
    }
 
})


const authSlice = createSlice({
   name:"user",
   initialState,
   reducers:{},
   extraReducers :(builder)=>{
    builder
    .addCase(userSignUp.fulfilled , (state ,action)=>{
        state.user = action?.payload;
        state.isLoggedIn= true
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.user = action?.payload;
        state.isLoggedIn = true;
      })

   }
})

export default authSlice.reducer