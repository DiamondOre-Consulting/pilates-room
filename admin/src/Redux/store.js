import {configureStore} from '@reduxjs/toolkit'
import classSlice from './Slices/classSlice';
import  trainingSlice from './Slices/trainingSlice'

export const store = configureStore({
    reducer:{
       class : classSlice,
       training : trainingSlice,
    }
   
})