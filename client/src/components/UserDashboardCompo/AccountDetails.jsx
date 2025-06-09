import { changePassword, editUser, userData } from "@/Redux/Slices/authSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const AccountDetails = () => {
  const { user } = useSelector((state) => state?.auth);
  const [editProfile, setEditProfile] = useState(user?.data);
  const dispatch = useDispatch();
  const [showNewPasswordFeild, setShowNewPasswordFeild] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (!oldPassword || !newPassword) {
        toast.error("All Fields are required");
        return;
      }
      if (oldPassword === newPassword) {
        toast.error("Old password and new password can't be same ");
        return;
      }

      console.log(oldPassword);

      setLoader(true);
      const response = await dispatch(
        changePassword({ newPassword, oldPassword })
      );

      if (response?.payload?.success) {
        setShowNewPasswordFeild(false);
        setLoader(false);
        setNewPassword("");
        setOldPassword("");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setNewPassword("");
      setOldPassword("");
      setConfirmationPopUp(false);
    }
  };

  const handlePhoneChange = (phoneNumber) => {
    console.log(phoneNumber);
    setEditProfile((prev) => ({ ...prev, phoneNumber }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditUserDetails = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await dispatch(editUser(editProfile));
      await dispatch(userData());
    } catch (error) {
      return;
    } finally {
      setLoader(false);
    }
  };

  console.log("userin accoutdetails", user);

  console.log("eidt profiledata", editProfile);
  return (
    <div>
      <div className="border-gray-400 border-t bg-light px-1  py-2 text-base">
        Basic Info
      </div>
      <form
        onSubmit={handleEditUserDetails}
        className=" flex flex-col justify-start relative w-full"
      >
        <div className="border-gray-400 border-y flex  flex-col justify-start text-left text-[16px] py-2">
          <label className="text-gray-800">First Name</label>
          <input
            value={editProfile?.firstName}
            type="text"
            onChange={handleChange}
            name="firstName"
            className="focus:outline-none px-1 "
          />
        </div>

        <div className="border-gray-400 border-b flex  flex-col justify-start text-left text-[16px] py-2">
          <label className="text-gray-800">Last Name</label>
          <input
            value={editProfile?.lastName}
            type="text"
            onChange={handleChange}
            name="lastName"
            className="focus:outline-none px-1 "
          />
        </div>

        <div className="border-gray-400 border-b flex  flex-col justify-start text-left text-[16px] py-2">
          <label className="text-gray-800">Email</label>
          <input
            type="email"
            value={editProfile?.email}
            onChange={handleChange}
            name="email"
            className="focus:outline-none px-1 "
          />
        </div>

        <div className="border-gray-400 border-b flex  flex-col justify-start text-left text-[16px] py-2">
          <label className="text-gray-800">Phone Number</label>

          <PhoneInput
            className="mt-2"
            country={"in"}
            value={editProfile?.phoneNumber}
            onChange={handlePhoneChange}
            inputStyle={{ width: "100%" }}
            placeholder="Phone Number (optional)"
          />
        </div>

        <div className="border-gray-400 border-b flex  flex-col justify-start text-left text-[16px] py-2">
          <label className="text-gray-800">DOB</label>
          <input
            type="date"
            onChange={handleChange}
            name="birthDate"
            value={editProfile?.birthDate?.split("T")[0]}
            className="focus:outline-none px-1 "
          />
        </div>
        <div className="border-gray-400 border-b flex  flex-col justify-start text-left text-[16px] py-2">
          <label className="text-gray-800">Password</label>
          <div className="flex justify-between">
            <input
              type="text"
              value="********"
              className="focus:outline-none px-1 "
            />
            <p>
              <svg
                onClick={() => {
                  setShowNewPasswordFeild(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer z-80"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-pencil-icon lucide-pencil"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                <path d="m15 5 4 4" />
              </svg>
            </p>
          </div>
        </div>

        <button
          // onClick={}
          disabled={loader}
          className="uppercase border border-gray-800 hover:text-white w-full mt-2 text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer  px-4 py-1 rounded-md text-xl bg-dark text-white"
        >
          {loader ? (
            <div role="status" className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="inline w-6 h-6 text-gray-200 animate-spin fill-gray-600"
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
            "Submit"
          )}
        </button>
        {showNewPasswordFeild && (
          <div className=" absolute inset-0 bg-black/20 backdrop-blur-sm top-0 left-0 flex justify-center items-center">
            <form className=" shadow-md rounded-md bg-white py-10 flex flex-col justify-center w-full max-w-[25rem]  p-6">
              <h1 className="text-xl md:text-4xl mb-6">Change Password</h1>

              {/* Old Password */}
              <div className="flex flex-col space-y-1 relative">
                <label>Old Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  className="border border-gray-500 px-2 py-1 rounded-md pr-10"
                  placeholder="Enter Old Password"
                />
                <div
                  className="absolute right-2 top-[38px] cursor-pointer text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </div>
              </div>

              {/* New Password */}
              <div className="flex flex-col mt-2 space-y-1 relative">
                <label>New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  className="border border-gray-500 px-2 py-1 rounded-md pr-10"
                  placeholder="Enter New Password"
                />
                <div
                  className="absolute right-2 top-[38px] cursor-pointer text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </div>
              </div>

              <button
                onClick={() => setConfirmationPopUp(true)}
                type="button"
                className="w-full p-3 mt-6 cursor-pointer  bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none transition-colors"
              >
                {loader ? (
                  <div
                    role="status"
                    className="flex items-center justify-center"
                  >
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
        )}
        <AnimatePresence>
          {confirmationPopUp && (
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
                  Do you really want to change your password? This action cannot
                  be undone.
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setConfirmationPopUp(false)}
                    className="px-4 py-2 border cursor-pointer rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700"
                  >
                    {loader ? (
                      <div
                        role="status"
                        className="flex items-center justify-center"
                      >
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
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default AccountDetails;
