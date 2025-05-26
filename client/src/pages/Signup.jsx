import { sendOtp, userSignUp } from "@/Redux/Slices/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useId } from "react";
import { OTPInput } from "input-otp";
import { cn } from "@/lib/utils";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Signup = ({ setIsPopUpOpen, setIsSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [otpField, setOtpField] = useState(false);
  const id = useId();
  const [otherFeild, setOtherFeild] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    otp: "",
    password: "",
    phoneNumber: "",
    birthDate:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (phoneNumber) => {
    console.log(phoneNumber)
    setFormData((prev) => ({ ...prev, phoneNumber }));
  };

  const handleOtpChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      otp: value,
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!formData?.email.trim()) {
      toast.error("Please enter a valid email ID");
      return;
    }

    setLoader(true);

    try {
      const response = await dispatch(sendOtp({ email: formData?.email }));
      if (response?.payload?.statusCode === 200) {
        setOtherFeild(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
console.log(formData)
    if (
      !formData?.email.trim() ||
      !formData?.otp.trim() ||
      !formData?.password.trim() ||
      !formData?.firstName.trim() ||
      !formData?.lastName.trim() ||
      !formData?.phoneNumber.trim()||
      !formData?.birthDate.trim()
    ) {
      toast.error("All the feilds are required");
      return;
    }
    setLoader(true);

    try {
      console.log(formData);
      const response = await dispatch(userSignUp(formData));
      if (response?.payload?.statusCode === 200) {
        setIsPopUpOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  function Slot(props) {
    return (
      <div
        className={cn(
          "border-input bg-background text-foreground flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
          { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive }
        )}
      >
        {props.char !== null && <div>{props.char}</div>}
      </div>
    );
  }
  return (
    <div>
      <div>
        <div className="flex justify-between h-full">
          <div className=" w-full flex flex-col  items-center justify-center  h-full ">
            <div className="py-4 h-[33rem] flex justify-center flex-col  px-8">
              <h1 className=" text-3xl text-center">SignUp</h1>
              <div className=" mt-1 flex flex-col justify-center  items-center  w-full">
                <div className=" space-x-6 min-w-xs h-auto  items-center justify-center ">
                  <div className="flex flex-col w-full space-y-1">
                    <label className="text-md text-gray-600 text-left">
                      Email Address
                    </label>
                    <input
                      type="email "
                      name="email"
                      value={formData?.email}
                      onChange={handleInputChange}
                      className=" border border-gray-400 rounded-md py-1 px-1 w-full focus:outline-none"
                    />
                  </div>

                  {otherFeild && (
                    <div className="flex flex-col  mt-2">
                      <label className="text-md text-gray-600">OTP</label>
                      {/* <input
                        name="otp"
                        value={formData?.otp}
                        onChange={handleInputChange}
                        className=" border border-gray-400 rounded-md py-1 px-1 md:w-[20rem] focus:outline-none"
                      /> */}
                      <OTPInput
                        id={id}
                        name="otp"
                        value={formData?.otp}
                        onChange={handleOtpChange}
                        containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                        maxLength={6}
                        render={({ slots }) => (
                          <div className="flex gap-2">
                            {slots.map((slot, idx) => (
                              <Slot key={idx} {...slot} />
                            ))}
                          </div>
                        )}
                      />
                    </div>
                  )}
                </div>

                {otherFeild && (
                  <>
                    {" "}
                    <div className=" w-full">

                      <div className="flex space-x-2">
                
                      <div className="flex flex-col mt-2 ">
                        <label className="text-md text-gray-600">
                          First Name
                        </label>
                        <input
                          name="firstName"
                          value={formData?.firstName}
                          onChange={handleInputChange}
                          className=" border border-gray-400 rounded-md py-1 px-1  focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col mt-2">
                        <label className="text-md text-gray-600">
                          Last Name
                        </label>
                        <input
                          name="lastName"
                          value={formData?.lastName}
                          onChange={handleInputChange}
                          className="border border-gray-400 rounded-md py-1 px-1  focus:outline-none"
                        />
                      </div>
        
                      </div>
                      <PhoneInput
                      className="mt-2"
                        country={"in"}
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                        inputStyle={{ width: "100%" }}
                        placeholder="Phone Number (optional)"
                      />


                        <div className="flex flex-col mt-2">
                        <label className="text-md text-gray-600">
                          DOB
                        </label>
                        <input
                          name="birthDate"
                          type="date"
                          value={formData?.birthDate}
                          onChange={handleInputChange}
                          className="border border-gray-400 rounded-md py-1 px-1  focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mt-2 w-full">
                      <label className="text-md text-gray-600">Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleInputChange}
                        className="border border-gray-400 rounded-md py-1 px-1 w-full focus:outline-none"
                      />

                      <p className="space-x-2 mt-2 text-sm flex items-center ">
                        <input
                          type="checkbox"
                          onClick={() => setShowPassword((prev) => !prev)}
                        />
                        <span>Show Password</span>
                      </p>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={otherFeild ? handleSignup : handleSendOtp}
                disabled={loader}
                className="uppercase border border-gray-800 hover:text-white w-full mt-2 text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer  px-4 py-1 rounded-md text-xl bg-dark text-white"
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
                ) : otherFeild ? (
                  "Sign Up"
                ) : (
                  "Send Otp"
                )}
              </button>
            </div>
            <div
              onClick={() => setIsSignIn(true)}
              className="bg-dark cursor-pointer h-18 rounded-t-[10rem] w-full flex justify-center items-center  text-white  upercase text-xl shadow-xl"
            >
              Sign In
            </div>
            {/* <p className="lg:hidden md:hidden block mt-2 cursor-pointer">
              {" "}
              already have an account ?{" "}
              <span onClick={() => setIsSignIn(true)}>signin</span>
            </p> */}
          </div>
          {/* <div className="border w-full  bg-light flex flex-col py-10 md:hidden hidden lg:flex justify-between items-center ">
            <div>
              <h1 className="text-4xl  uppercase"> One Of us ?</h1>
              <p className="text-center">Join sign in</p>
            </div>
            <button
              onClick={() => setIsSignIn(true)}
              className="uppercase border border-gray-800  hover:text-white mt-10 text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer  px-10 py-1 rounded-md text-xl hover:bg-[#FF6950]"
            >
              Sign In
            </button>
            
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
