import {configureStore} from '@reduxjs/toolkit'
import classSlice from './Slices/classSlice';


export const store = configureStore({
    reducer:{
       class : classSlice
    }
   
})