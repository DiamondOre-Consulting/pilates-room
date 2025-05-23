import { adminData } from '@/Redux/Slices/authSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const [isLoggedIn , setIsLoggedIn] = useState();
    const location = useLocation();

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await dispatch(adminData());
                console.log(res)
                if(res?.payload?.success){
                    setIsLoggedIn(true)
                }
                else{
                    setIsLoggedIn(false)
                }
            } catch (error) {
               return
            }
        }
        fetchData()
    } , [dispatch, isLoggedIn , location?.pathname]);

    if(isLoggedIn == null){
        return <div>Loading....</div>
    }


    console.log("asdfghjkl;",isLoggedIn)
    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }

  return (
     <Outlet/>
  )
}

export default ProtectedRoute