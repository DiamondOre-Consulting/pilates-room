
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import adminAxiosInstance from '../../Helper/axiosInstance'




export const adminAddClass = createAsyncThunk("/admin/add-class", async (data) => {
  try {
    console.log(data)
    const response = await adminAxiosInstance.post("/admin/create-class" , data);
    console.log(response);
    toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    console.log(error)
    toast?.error(error?.response?.data?.message);
  }
});


export const getAllClasses = createAsyncThunk('/admin/all-class' , async()=>{
    try{

        const response = await adminAxiosInstance.get('/admin/get-classes' );
        toast.success(response?.data?.message);
        return response?.data
    }catch(error){
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
