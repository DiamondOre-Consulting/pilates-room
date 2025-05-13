import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import adminAxiosInstance from "../../Helper/axiosInstance";

export const adminAddClass = createAsyncThunk(
  "/admin/add-class",
  async (data) => {
    try {
      console.log(data);
      const response = await adminAxiosInstance.post(
        "/admin/create-class",
        data
      );
      console.log(response);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.log(error);
      toast?.error(error?.response?.data?.message);
    }
  }
);

export const getAllClasses = createAsyncThunk(
  "/admin/all-class",
  async ({ page, limit }) => {
    try {
      console.log("data is ", page, limit);
      const queryParams = new URLSearchParams();

      if (limit) queryParams.append("limit", limit);
      if (page) queryParams.append("page", page);
      const response = await adminAxiosInstance.get(
        `/admin/get-classes?${queryParams?.toString()}`
      );
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteClass = createAsyncThunk(
  "/admin/delete-class",
  async (id) => {
    try {
      const response = await adminAxiosInstance.delete(
        `/admin/delete-class/${id}`
      );
      console.log(response);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const editClass = createAsyncThunk('/admin/edit-class' , async({classId , formData})=>{

  try{

    console.log("inslice ", classId ,  formData)
    
    const response = await adminAxiosInstance.put(`/admin/edit-class/${classId}` , formData);
    toast.success(response?.data?.message)
    return response?.data
  }
  catch(error){
    console.log(error);
    toast.error(error?.response?.data?.message)
  } 
})


const classSlice = createSlice({
  name: "class",
  initialState: null,
  reducers: {},
  extraReducers: () => {},
});

export default classSlice.reducer;
