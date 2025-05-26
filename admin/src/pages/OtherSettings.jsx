import { HomeLayout } from "@/Layout/HomeLayout";
import { changePassword } from "@/Redux/Slices/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const OtherSettings = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault()
    try {
      
      setLoader(true);
      const response = await dispatch(changePassword(newPassword));
      if(response?.payload?.success){
       setNewPassword("")
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setNewPassword("");
      setConfirmationPopUp(false)
    }
  };

  return (
    <HomeLayout>
      <div className=" h-screen  flex justify-center items-center">
        <form  className="bg-white shadow-md rounded-md py-10 flex flex-col justify-center   p-6">
          <h1 className="text-xl md:text-4xl mb-6">Change Password</h1>
          <div className="flex flex-col space-y-1">
            <label>New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setNewPassword(e?.target?.value)}
              className="border border-gray-500 px-1 py-1 rounded-md"
              placeholder="Enter New Password"
            />
          </div>

          <div className="flex mt-2 justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                name="showPassword"
              onClick={() => setShowPassword((prev) => !prev)}
                className="mr-2"
              />
              <label for="rememberMe" className="ml-2 text-sm text-gray-600">
                Show Password
              </label>
            </div>
          </div>

          <button
          onClick={()=> setConfirmationPopUp(true)}
            type="button"
            className="w-full p-3 mt-6 cursor-pointer  bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none transition-colors"
          >
            {loader ? (
              <div role="status" className="flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 text-gray-200 animate-spin  fill-gray-600 "
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>


   <AnimatePresence>
      {
        confirmationPopUp &&(
         <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xl font-semibold mb-2">Are you sure?</div>
              <div className="text-sm text-gray-600 mb-6">
                Do you really want to change your password? This action cannot be undone.
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={()=> setConfirmationPopUp(false)}
                  className="px-4 py-2 border cursor-pointer rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700"
                >
                          {loader ? (
              <div role="status" className="flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 text-gray-200 animate-spin  fill-gray-600 "
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                {/* <span className="ml-2">Loading...</span> */}
              </div>
            ) : (
              "Yes, Change"
            )}
                 
                </button>
              </div>
            </motion.div>
          </motion.div>
        )
      }
      </AnimatePresence>
    </HomeLayout>
  );
};

export default OtherSettings;
