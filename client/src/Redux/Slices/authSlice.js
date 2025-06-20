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
    // toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
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
      return;
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
  async (password) => {
    try {
      console.log("passsword new ", password, "old");
      const response = await userAxiosInstance.post(
        `/user/change-password/${password?.newPassword}/${password?.oldPassword}`
      );
      toast.success(response?.data?.message);
      return response?.data;
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
    initialState.isLoggedIn = false;
    return;
  }
});

export const logout = createAsyncThunk("/user/logout", async () => {
  try {
    let res = await userAxiosInstance.get("/user/sign-out");

    return res.data;
  } catch (e) {
    return e?.response?.data?.message;
  }
});

export const editUser = createAsyncThunk("/user/edit-user", async (data) => {
  try {
    const response = await userAxiosInstance.put("/user/edit-user", data);
    console.log(response);
    toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return;
  }
});

export const getScheduleClass = createAsyncThunk(
  "/user/get-schedule-class",
  async () => {
    try {
      const response = await userAxiosInstance.get("/user/get-scheduled-class");
      return response?.data;
    } catch (error) {
      return;
    }
  }
);

export const getOrderData = createAsyncThunk(
  "/user/get-order-history",
  async () => {
    try {
      const response = await userAxiosInstance.get("/user/get-order-history");
      return response?.data;
    } catch (error) {
      return;
    }
  }
);

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
      .addCase(userSignIn.rejected, (state, action) => {
        console.log("userSignIn rejected:", action?.error);
        state.isLoggedIn = false;
        state.user = {};
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        console.log("is fullfilment", action);
        if (action.payload?.error) {
          state.isLoggedIn = false;
          state.user = {};
        } else {
          state.user = action?.payload;
          state.isLoggedIn = true;
        }
      })
      .addCase(userData.fulfilled, (state, action) => {
        state.user = action?.payload;
        console.log("active", action?.payload);
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log("Logout fulfilled");
        state.user = {};
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
