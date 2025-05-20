import {configureStore} from '@reduxjs/toolkit'
import classSlice from './Slices/classSlice';
import  trainingSlice from './Slices/trainingSlice'
import memberShipPackage from './Slices/MembershpPackageSlice'
import orderSlice from './Slices/orderSlice'
import authSlice from './Slices/authSlice'

export const store = configureStore({
    reducer:{
       authSlice : authSlice,

       class : classSlice,
       training : trainingSlice,
       membership : memberShipPackage,
       order: orderSlice,
    }
   
})