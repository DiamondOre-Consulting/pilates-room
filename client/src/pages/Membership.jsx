import { getMemberShipPackage } from "@/Redux/Slices/MembershpPackageSlice";
import { IndianRupee } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import SignIn from "./SignIn";
import Signup from "./Signup";
import {
  checkOutPayment,
  createMembership,
  getRazorpaykey,
  varifyPayment,
} from "@/Redux/Slices/paymentSlice";
import { userData } from "@/Redux/Slices/authSlice";

const Membership = () => {
  const [allMemberShip, setAllMemberShip] = useState([]);
  const dispatch = useDispatch();
  const [showSignIn, setShowSignIn] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("Discovery");
  const [loader, setLoader] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [selectedLocation, setSelectedLocation] = useState(
    user?.data?.memberShipPlan?.location
  );

  const handleGetAllMemberShip = async () => {
    try {
      console.log(1);

      const response = await dispatch(
        getMemberShipPackage({
          packageType: selectedPlan.toLowerCase(),
          location: selectedLocation,
        })
      );
      setAllMemberShip(response?.payload?.data);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSelectedLocation(user?.data?.memberShipPlan?.location || "");
  }, [isLoggedIn]);

  useEffect(() => {
    if (selectedLocation && selectedPlan) {
      handleGetAllMemberShip();
    }
  }, [selectedPlan, selectedLocation]);

  console.log(
    "jsaksfskjfjjkfsdjkf   kjdsfsjkdfs",
    selectedPlan,
    selectedLocation
  );
  // const [membershipPackageId , setMembershipPackageId] = useState(null)
  const [razorpayKey, setRazorPayKey] = useState();
  const handleGetRazorPayKey = async () => {
    try {
      const response = await dispatch(getRazorpaykey());
      console.log("key", response);
      setRazorPayKey(response?.payload?.data?.key);
      console.log("it is a key", razorpayKey);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (!isPopUpOpen) {
      handleGetRazorPayKey();
    }
  }, [dispatch, isPopUpOpen, user]);

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_order_id: "",
    razorpay_signature: "",
  };

  // console.log("membership id" , membershipPackageId)
  const handleCheckOutPayment = async (membershipPackageId) => {
    try {
      setLoader(membershipPackageId);
      if (!razorpayKey) {
        await handleGetRazorPayKey();
      }

      console.log("id in a function", membershipPackageId);
      const response = await dispatch(checkOutPayment({ membershipPackageId }));
      console.log("slectedmemebership", response);
      console.log("key in function", razorpayKey);
      const options = {
        key: razorpayKey,
        amount: response?.payload?.data?.amount,
        currency: response?.payload?.data?.currency,
        name: "The-Pilates-Room",
        description: "",
        image: "",
        order_id: response?.payload?.data?.id,
        handler: async function (res) {
          const paymentDetails = {
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_order_id: res.razorpay_order_id,
            razorpay_signature: res.razorpay_signature,
          };

          console.log("paymentdetails", paymentDetails);

          const response = await dispatch(varifyPayment(paymentDetails));
          console.log("response:", response);
          console.log(response.payload.success);
          if (response.payload.success) {
            console.log("console after success");

            console.log(
              "data consoleafter success",
              membershipPackageId,
              paymentDetails.razorpay_payment_id
            );
            const res = await dispatch(
              createMembership({
                membershipPackageId,
                paymentId: paymentDetails.razorpay_payment_id,
              })
            );
            console.log("Membership creation:", res);
            await dispatch(userData());
          }
        },
        prefill: {
          name: "Zoya",
          email: "zoya@gmail.com",
          contact: "9811839410",
        },
        theme: {
          color: "#F37254",
        },
      };
      if (typeof window.Razorpay !== "undefined") {
        const razor = new window.Razorpay(options);

        razor.open();
      } else {
        console.error("Razorpay script not loaded");
        toast.error("Payment gateway is not available. Try again later.");
      }
    } catch (error) {
      console.log(error, razorpayKey);
    } finally {
      setLoader(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    console.log("today dateeeee", todayDate);
    return todayDate;
  };

  console.log("all membership packages", allMemberShip);
  return (
    <div>
      <section className="w-full">
        <div className="w-full h-[28rem] bg-[url('https://exhalepilateslondon.com/wp-content/uploads/2022/11/class-schedule.jpg')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center ">
          <div>
            <h1 className="text-white text-center xl:text-7xl uppercase lg:text-4xl md:text-4xl sm:text-4xl text-4xl ">
              Book Membership
            </h1>
          </div>
        </div>
      </section>

      <section
        className={`ezy__pricing10  light  bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white`}
      >
        <div className=" relative py-14 md:py-24">
          <div className="grid ">
            <div className="flex flex-col items-center justify-center mb-4">
              <h3 className="text-3xl leading-none md:text-[45px] text-gray-800 font-bold mb-2">
                Our Membership plans
              </h3>

              <div className="flex items-center my-2 justify-center gap-2 bg-dark rounded-full p-1 text-white w-fit mx-auto">
                {["Discovery", "Monthly", "Quarterly"].map((label, index) => (
                  <button
                    key={index}
                    className={`px-4 py-1 rounded-full cursor-pointer text-sm font-semibold transition-all ${
                      selectedPlan === label
                        ? "bg-white text-black"
                        : "bg-transparent text-white"
                    }`}
                    onClick={() => setSelectedPlan(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedPlan === "Discovery" ? (
            <div>
              {allMemberShip?.map((ele, index) => (
                <div
                  className={`flex  flex-col md:flex-row md:space-y-0 space-y-2 ${
                    index % 2 === 0
                      ? "bg-dark text-white "
                      : "bg-white flex-col md:flex-row-reverse"
                  }  py-20`}
                >
                  <div className="flex flex-col justify-center  items-center space-y-1 w-full md:max-w-xl mx-auto ">
                    <h1 className="text-4xl uppercase">{ele?.packageName}</h1>
                    <p
                      className={`text-center px-4 ${
                        index % 2 === 0 ? "text-gray-200" : "text-black "
                      } text-center`}
                      dangerouslySetInnerHTML={{ __html: ele?.description }}
                    ></p>
                    <p>Location : {ele?.location}</p>
                    <p className="">
                      Price : ₹ {ele?.price?.toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={() => {
                        // console.log("dataaaaaaaaaaaa",user?.data?.memberShipPlan?.package?._id === ele?._id)
                        // if( user?.data?.isMember  && user?.data?.memberShipPlan?.package?._id === ele?._id){
                        //   return
                        // }
                        if (!isLoggedIn) {
                          console.log("clicked", isLoggedIn, showSignIn);
                          setIsPopUpOpen(true);
                        } else {
                          console.log("Selected package ID:", ele?._id);
                          // setMembershipPackageId(ele?._id)
                          user?.data?.isDiscovery
                            ? ""
                            : handleCheckOutPayment(ele?._id);
                        }
                      }}
                      // disabled={ user?.data?.isMember && user?.data?.memberShipPlan?.package?._id === ele?._id}
                      className={`text-xl  cursor-pointer mt-3 ${
                        user?.data?.isDiscovery
                          ? "bg-green-600 text-white"
                          : "bg-white text-dark"
                      }  rounded-md px-4 py-1`}
                    >
                      {loader ? (
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                      ) : user?.data?.isDiscovery ? (
                        "Session Booked"
                      ) : (
                        "Book Now"
                      )}
                    </button>
                  </div>

                  <div
                    className="justify-center md:mt-0 mt-4 items-center w-full md:w-[35rem] flex mx-auto rounded-lg h-80 "
                    style={{
                      backgroundImage: `url('https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                      backgroundSize: "cover",
                    }}
                  >
                    {/* <img
        src="https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg"
        className="w-[30rem] h-[25rem]  objet-cover  rounded-lg"
        alt=""
      /> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative py-10">
              <div className="grid grid-cols-1 px-4 sm:px-6 lg:px-10 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                {allMemberShip?.map((pkg) => (
                  <div
                    key={pkg._id}
                    className=" shadow-md rounded-xl border max-w-[25rem] border-gray-300 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="bg-gradient-to-r from-[#002433] to-[#00354C]  px-6 py-4">
                      <p className="text-xl md:text-2xl text-center capitalize font-semibold text-gray-100 dark:text-white">
                        {pkg?.packageName}
                      </p>
                    </div>

                    <div className="p-2 text-gray-800 dark:text-white">
                      <div className="flex flex-col min-w-[19rem] p-1 pb-0 gap-1 text-[15px]  text-gray-500   capitalize">
                        <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                          Total Price
                          <span className="text-[1.01rem] dark:text-white text-black">
                            ₹{pkg?.price.toLocaleString("en-IN")}
                          </span>
                        </p>
                        <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                          Price per week
                          <span className="text-[1.01rem] dark:text-white text-black">
                            ₹{pkg?.perSessionPrice.toLocaleString("en-IN")}
                          </span>
                        </p>
                        <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                          Available
                          <span className="text-[1.01rem] dark:text-white text-black">
                            {pkg.available ? "Yes" : "No"}
                          </span>
                        </p>
                        <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                          Location
                          <span className="text-[1.01rem] dark:text-white text-black">
                            {pkg.location}
                          </span>
                        </p>
                        <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                          Type
                          <span className="text-[1.01rem] dark:text-white text-black">
                            {pkg?.packageType}
                          </span>
                        </p>
                        <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                          Total Sessions
                          <span className="text-[1.01rem] capitalize dark:text-white text-black">
                            {pkg?.totalSessions}
                          </span>
                        </p>
                        <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                          Validity
                          <span className="text-[1.01rem] dark:text-white text-black">
                            {pkg?.validity} weeks
                          </span>
                        </p>
                      </div>

                      {/* <div
                  className="text-sm mt-4"
                  dangerouslySetInnerHTML={{ __html: pkg.description }}
                /> */}
                    </div>

                    <button
                      onClick={() => {
                        if (
                          user?.data?.isMember &&
                          user?.data?.memberShipPlan?.package?._id === pkg?._id
                        ) {
                          return;
                        }

                        if (
                          user?.data?.memberShipPlan?.package?._id ===
                            pkg?._id &&
                          (user?.data?.memberShipPlan?.remainingSession === 0 ||
                            user?.data?.isMember == false ||
                            getTodayDate() >
                              user?.data?.memberShipPlan?.expiryDate.split(
                                "T"
                              )[0])
                        ) {
                          handleCheckOutPayment(pkg?._id);
                        }

                        if (!isLoggedIn) {
                          console.log("clicked", isLoggedIn, showSignIn);
                          setIsPopUpOpen(true);
                        } else {
                          handleCheckOutPayment(pkg?._id);
                        }
                      }}
                      disabled={
                        user?.data?.isMember &&
                        user?.data?.memberShipPlan?.package?._id === pkg?._id
                      }
                      className={` ${
                        user?.data?.memberShipPlan?.package?._id === pkg?._id &&
                        user?.data?.isMember === true
                          ? "bg-green-600"
                          : user?.data?.memberShipPlan?.package?._id ===
                              pkg?._id &&
                            (user?.data?.memberShipPlan?.remainingSession ===
                              0 ||
                              user?.data?.isMember == false ||
                              getTodayDate() >
                                user?.data?.memberShipPlan?.expiryDate.split(
                                  "T"
                                )[0])
                          ? "bg-red-600"
                          : "bg-dark"
                      } px-6 mt-4 py-2 m-2 rounded cursor-pointer text-white hover:bg-opacity-90 duration-300`}
                    >
                      {loader === pkg?._id ? (
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6 text-gray-200 text-center flex justify-center items-center mx-auto animate-spin dark:text-gray-600 fill-blue-600"
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
                      ) : //   : user?.data?.isDiscovery && user?.data?.memberShipPlan?.remainingSession > 0 && user?.data?.isMember ? (
                      //   "Session Booked"
                      // ) : user?.data?.memberShipPlan?.remainingSession === 0 || user?.data?.isMember == false ||
                      //   getTodayDate() >
                      //     user?.data?.memberShipPlan?.expiryDate.split(
                      //       "T"
                      //     )[0] ? (
                      //   "Renew Package"
                      // ) : (
                      //   "Book Now"
                      // )}

                      user?.data?.memberShipPlan?.package?._id === pkg?._id &&
                        user?.data?.memberShipPlan?.remainingSession > 0 &&
                        user?.data?.isMember === true ? (
                        <p>Session Booked</p>
                      ) : user?.data?.memberShipPlan?.package?._id ===
                          pkg?._id &&
                        (user?.data?.memberShipPlan?.remainingSession === 0 ||
                          user?.data?.isMember == false ||
                          getTodayDate() >
                            user?.data?.memberShipPlan?.expiryDate.split(
                              "T"
                            )[0]) ? (
                        "Renew Your Package"
                      ) : (
                        <p>Book Now</p>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {!user?.data?.isDiscovery && (
                <div className="absolute inset-0 z-20 backdrop-blur-sm flex items-start pt-30 justify-center bg-black/60 text-white">
                  <div className="flex flex-col max-w-md mx-auto text-center p-4">
                    <p className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="16" r="1" />
                        <rect x="3" y="10" width="18" height="12" rx="2" />
                        <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                      </svg>
                    </p>
                    <p className="text-xl">
                      You can't access this package because you haven't
                      purchased the <strong>Discovery</strong> package yet.
                    </p>
                    <button
                      onClick={() => setSelectedPlan("Discovery")}
                      className="bg-dark w-fit py-2  mx-auto px-4 cursor-pointer z-80 mt-3 "
                    >
                      Book Discovery Package
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {!user?.data?.isMember && !selectedLocation && (
            <div className="absolute  h-screen inset-0 z-20 backdrop-blur-sm flex items-start pt-30 justify-center bg-black/60 text-white">
              <div className=" dark:bg-gray-900 p-6 md:w-5xl text-white  w-full text-center">
                <h2 className="text-4xl md:text-8xl font-semibold mb-4 text-gray-300">
                  Select Your Location
                </h2>

                <div className="flex space-x-2">
                  <select
                    className="w-full py-2 cursor-poiner rounded-full px-2  bg-gray-100 text-black border "
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">-- Choose Location --</option>
                    <option value="faridabad">Faridabad</option>
                    <option value="gurugram">Gurugram</option>
                  </select>

                  <button
                    onClick={() => handleGetAllMemberShip()}
                    disabled={!selectedLocation}
                    class="group relative inline-flex cursor-pointer h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 font-medium text-neutral-200"
                  >
                    <div class="translate-x-0 transition group-hover:translate-x-[300%]">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div class="absolute -translate-x-[300%] transition group-hover:translate-x-0">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {isPopUpOpen && (
        <div className="fixed inset-0 z-40 min-h-full    transition flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsPopUpOpen(false)}
          ></div>

          <div className="bg-white z-80  rounded-md">
            {isSignIn ? (
              <SignIn
                setIsPopUpOpen={setIsPopUpOpen}
                setIsSignIn={setIsSignIn}
              />
            ) : (
              <Signup
                setIsPopUpOpen={setIsPopUpOpen}
                setIsSignIn={setIsSignIn}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;
