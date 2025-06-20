import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../Redux/Slices/authSlice.js'
import classSlice from '../Redux/Slices/classSlice.js'
import packageSlice from '../Redux/Slices/packageSlice.js'
import trainingSlice from '../Redux/Slices/trainingSlice.js'
import memberShipSlice from '../Redux/Slices/MembershpPackageSlice.js'
import paymentSlice from '../Redux/Slices/paymentSlice.js'
import blogSlice from '../Redux/Slices/blogSlice.js'
import contactSlice from '../Redux/Slices/classSlice.js'

export const store = configureStore({
    reducer:{
        auth : authSlice,
        class : classSlice,
        package : packageSlice,
        training : trainingSlice,
        membership: memberShipSlice,
        payment: paymentSlice,
        blog : blogSlice,
        contact : contactSlice
    }
   
})