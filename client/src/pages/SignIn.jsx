import { forgotPassword, userSignIn } from "@/Redux/Slices/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import UserDashboard from "./UserDashboard";

const SignIn = ({ setIsPopUpOpen, setIsSignIn }) => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordPopUp, setForgotPasswordPopUp] = useState(false);

  const handleSignIn = async () => {
    console.log("clicked");
    setLoader(true);

    try {
      const response = await dispatch(userSignIn({ email, password }));
      console.log(response);
      if (response?.payload?.success) {
        setIsPopUpOpen(false);
      }
    } catch (error) {
      return;
    } finally {
      setLoader(false);
    }
  };

  console.log(email);
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("please enter email address");
    }
    try {
      const response = await dispatch(forgotPassword({ email }));
      console.log(response);
    } catch (error) {
      return;
    } finally {
      setForgotPasswordPopUp(false);
      setIsPopUpOpen(false);
    }
  };
  return (
    <div>
      <div className="flex justify-center h-full">
        <div className="w-full relative">
          <div className="p-8 ">
            <h1 className=" text-4xl text-center">SignIn</h1>
            <div className="space-y-2 mt-10 flex flex-col justify-center  items-center  w-full">
              <div className="flex flex-col  justify-left">
                <label className="text-md text-gray-600">Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className=" border border-gray-400 rounded-md py-1 px-1 w-[20rem] focus:outline-none"
                />

              </div>

              <div className="flex flex-col ">
                <label className="text-md text-gray-600">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" border border-gray-400 rounded-md py-1 px-1 w-[20rem] focus:outline-none"
                />
                <p className="space-x-2 mt-1 text-sm flex items-center ">
                  <input
                    type="checkbox"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                  <span>Show Password</span>
                </p>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSignIn}
              className="uppercase border border-gray-800 hover:text-white w-[20rem] mt-10 text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer  px-4 py-1 rounded-md text-xl bg-dark text-white"
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
                "Sign In"
              )}
            </button>
            <p
              className="mt-4  underline cursor-pointer"
              onClick={() => {
                setForgotPasswordPopUp(true)

              }}
            >
              Forgot password?
            </p>
          </div>
          <div onClick={() => setIsSignIn(false)} className="bg-dark cursor-pointer h-20 rounded-t-[10rem] w-full flex justify-center items-center  text-white  upercase text-xl shadow-xl">
            Sign Up
          </div>
          {/* <p className="lg:hidden md:hidden block mt-2 cursor-pointer">
            {" "}
            don't have an account ?{" "}
            <span onClick={() => setIsSignIn(false)}>signup</span>
          </p> */}

          {forgotPasswordPopUp && (
            <main
              id="content"
              role="main"
              className="w-fit flex justify-center items-center z-40  fixed inset-0  mx-auto p-6"
            >
              <div className=" bg-white min-h-[30rem] mt-6   flex flex-col justify-center -mt-8  rounded-xl shadow-lg">
                <div className="p-4 sm:p-7">
                  <div className="text-center">
                    <h1 className=" uppercase block text-2xl myfont  text-gray-900 ">
                      Forgot password?
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 ">
                      Remember your password?
                      <p
                        onClick={() => setForgotPasswordPopUp(false)}
                        className="text-blue-600 cursor-pointer decoration-2 hover:underline font-medium"
                      >
                        Login here
                      </p>
                    </p>
                  </div>

                  <div className="mt-10">
                    <form onSubmit={handleForgotPassword}>
                      <div className="flex flex-col justify-center items-center gap-y-8 max-w-sm mx-auto">
                        <div className="flex flex-col justify-center  ">
                          <label
                            for="email"
                            className="block  text-md  ml-1 mb-2 "
                          >
                            Email
                          </label>
                          <div className="relative ">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className=" border border-gray-400 rounded-md py-1 px-1 w-[20rem] focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="uppercase border border-gray-800 hover:text-white w-full text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer  px-4 py-1 rounded-md text-xl bg-dark text-white"
                        >
                          {loader ? (
                            <div
                              role="status"
                              className="flex items-center justify-center"
                            >
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
                            "Send Link"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </main>
          )}
        </div>

        {/* <div className="border w-full bg-light md:hidden lg:flex hidden flex flex-col py-10 justify-between items-center ">
          <div>
            <h1 className="text-4xl  uppercase"> New Here ?</h1>
            <p className="text-center">Singup and discover</p>
          </div>
          <button
            onClick={() => setIsSignIn(false)}
            className="uppercase border border-gray-800  hover:text-white mt-10 text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer  px-10 py-1 rounded-md text-xl hover:bg-[#FF6950]"
          >
            Sign up
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;
