import userAxiosInstance from "@/Helper/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getMemberShipPackage = createAsyncThunk(
  "/user/get-Package",
  async (packageType) => {
    try {
      const queryParams = new URLSearchParams();

      if (packageType) queryParams.append("packageType", packageType);
      const response = await userAxiosInstance.get(
        `/user/get-membership-packages?${queryParams?.toString()}`
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const membershipPackageSlice = createSlice({
  name: "membership",
  initialState: null,
});

export default membershipPackageSlice.reducer;
