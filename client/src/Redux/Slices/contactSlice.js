import userAxiosInstance from "@/Helper/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";


export const constUs = createAsyncThunk('/user/constus' , async(data)=>{
    try {


        const response = await userAxiosInstance.post('/user/');
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