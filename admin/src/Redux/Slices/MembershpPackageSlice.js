import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import adminAxiosInstance from "../../Helper/axiosInstance";

export const createMemberShipPackage = createAsyncThunk('/admin/createmembership' , async(data)=>{
    try {
        console.log(data)
        const response = await adminAxiosInstance.post('/admin/create-membership-package' , data);
        console.log(response);
        toast.success(response?.data?.message)
        return response?.data
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
    }
})


export const getMemberShipPackage = createAsyncThunk('/admin/get-Package' , async()=>{
    try{

        const response  =await adminAxiosInstance.get('/admin/get-all-membership-packages');
        console.log(response);
        return response?.data
    }
    catch(error){
        console.log(error)
    }
})


export const EditMemberShipPackage = createAsyncThunk('/admin/edit-package' , async({membershipPackageId , data})=>{
    try {
         const response = await adminAxiosInstance.put(`/admin/edit-membership-package/${membershipPackageId}` , data);
         console.log(response);
         toast.success(response?.data?.message)
         return response?.data
    } catch (error) {
        console.log(error)
    }
})



export const deleteMembershipPackage = createAsyncThunk('/admin/delete-package' , async(id)=>{
    try {

        console.log(id)
        const response = await adminAxiosInstance.delete(`/admin/delete-membership-package/${id}`)
        toast.success(response?.data?.message) 
        return response?.data
    } catch (error) {
        console.log(error)
    }
})


const membershipPackageSlice = createSlice({
    name:"membership",
    initialState : null,

})

export default membershipPackageSlice.reducer