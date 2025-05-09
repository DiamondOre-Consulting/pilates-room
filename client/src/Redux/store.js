import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../Redux/Slices/authSlice.js'
import classSlice from '../Redux/Slices/classSlice.js'
import packageSlice from '../Redux/Slices/packageSlice.js'
import trainingSlice from '../Redux/Slices/trainingSlice.js'

export const store = configureStore({
    reducer:{
        auth : authSlice,
        class : classSlice,
        package : packageSlice,
        training : trainingSlice
    }
   
})