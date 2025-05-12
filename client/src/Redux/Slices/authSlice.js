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

export const userSignIn = createAsyncThunk("/user/sign-in", async (data) => {
  try {
    const response = await userAxiosInstance.post("/user/signin", data);
    toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const forgotPassword = createAsyncThunk(
  "/user/forgot-password",
  async (data) => {
    try {
      console.log(data);
      const response = await userAxiosInstance.post(
        "/user/forgot-password",
        data
      );
      console.log(response);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const userResetPassword = createAsyncThunk(
  "/user/reset-password",
  async (data) => {
    try {
      console.log(data);
      const response = await userAxiosInstance.post(
        `/user/reset-password/${data?.resetToken}`,
        { newPassword: data?.newPassword }
      );
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      toast.error();
    }
  }
);

export const changePassword = createAsyncThunk(
  "/user/change-password",
  async (newPassword) => {
    try {
      const response = await userAxiosInstance.post(
        `/user/change-password/${newPassword}`
      );
      console.log(response);
      toast.success(response?.data?.message);
      return response.data

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const userData = createAsyncThunk("/user/user-data", async () => {
  try {
    const response = await userAxiosInstance.get("/user/get-user");
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error);
    initialState.isLoggedIn = false;
  }
});

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.user = action?.payload;
        state.isLoggedIn = true;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.user = action?.payload;
        state.isLoggedIn = true;
      })
      .addCase(userData.fulfilled, (state, action) => {
        state.user = action?.payload;
        console.log("active", action?.payload);
        state.isLoggedIn = true;
      });
  },
});

export default authSlice.reducer;
