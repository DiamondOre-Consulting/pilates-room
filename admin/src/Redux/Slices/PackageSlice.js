import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import adminAxiosInstance from "../../Helper/axiosInstance";

export const createPackage = createAsyncThunk(
  "/admin/create-package",
  async (formData ) => {
    try {
      const response = await adminAxiosInstance.post(
        "/admin/create-package",
        formData
      );
      toast.success(response?.data?.message);
      return response?.data
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);


export const getAllPackages = createAsyncThunk('/admin/get-package' , async({ page, limit })=>{
    try{

        const queryParams = new URLSearchParams();

        if (limit) queryParams.append("limit", limit);
        if (page) queryParams.append("page", page);

            const response = await adminAxiosInstance.get(`/admin/get-all-packages?${queryParams?.toString()}`);
            toast.success(response?.data?.message);
            return response?.data
    }
    catch(error){
        console.log(error)
    }
})


export const getSinglePackage = createAsyncThunk('/admin/get-single-packeage' , async(id)=>{
    try{
        const response = await adminAxiosInstance.get(`/admin/get-single-package/${id}`);
        console.log(response);
        toast.success(response?.data?.message)
        
    }
    catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message)
    }
})


export const editPackage = createAsyncThunk('/admin/edit-package' , async({packageId , formData})=>{

  try{

    console.log("inslice ", packageId ,  formData)
    
    const response = await adminAxiosInstance.put(`/admin/edit-package/${packageId}` , formData);
    toast.success(response?.data?.message)
    return response?.data
  }
  catch(error){
    console.log(error);
    toast.error(error?.response?.data?.message)
  } 
})


export const deletePackage = createAsyncThunk(
  "/admin/delete-package",
  async (id) => {
    try {
      const response = await adminAxiosInstance.delete(
        `/admin/delete-package/${id}`
      );
      console.log(response);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);



const packageSlice = createSlice({
  name: "package",
  initialState: null,
  reducers: {},
  extraReducers: () => {},
});

export default packageSlice.reducer