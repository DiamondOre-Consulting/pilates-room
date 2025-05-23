import userAxiosInstance from "@/Helper/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";


export const contactUs = createAsyncThunk('/user/contact-us' , async(data)=>{
    try {
        const response = await userAxiosInstance.post('/user/create-enquiry' , data);
        toast.success(response?.data?.message)
        return response?.data
        
    } catch (error) {
        console.log(error)
    }
})

const contactSlice = createSlice({
    name:"contact",
    initialState:null,
    reducers : {},
    extraReducers :()=>{

    }
})

export default contactSlice.reducer