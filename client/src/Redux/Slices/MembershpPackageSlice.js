import userAxiosInstance from "@/Helper/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getMemberShipPackage = createAsyncThunk(
  "/user/get-Package",
  async ({ packageType, location }) => {
    try {
      const queryParams = new URLSearchParams();

      if (packageType) queryParams.append("packageType", packageType);
      if (location) queryParams.append('location', location)
      const response = await userAxiosInstance.get(
        `/user/get-membership-packages?${queryParams?.toString()}`
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      return;
    }
  }
);

const membershipPackageSlice = createSlice({
  name: "membership",
  initialState: null,
});

export default membershipPackageSlice.reducer;
