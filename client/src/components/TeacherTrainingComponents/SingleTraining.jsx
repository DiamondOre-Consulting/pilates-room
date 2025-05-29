import { getSingleTraining } from "@/Redux/Slices/trainingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BookingSection from "../BookingSection";
import ContactUs from "../ContactUs";

const SingleTraining = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [contactusPopUp, setContactUsPopUp] = useState(false);

  const handleGetSingleTraining = async () => {
    try {
      const response = await dispatch(getSingleTraining(id));
      setData(response?.payload?.data);
    } catch (error) {
      return
    }
  };

  useEffect(() => {
    handleGetSingleTraining();
  }, []);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className="w-full">
        <div
          className="w-full h-[32rem] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center relative"
          style={{ backgroundImage: `url(${data?.thumbnail?.secureUrl})` }}
        >
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <div className="z-10">
            <h1 className="text-white uppercase tracking-wider widers text-center xl:text-7xl lg:text-4xl md:text-3xl sm:text-2xl text-3xl">
              {data?.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="flex md:flex-row flex-col justify-between border  px-10 py-10 items-center">
        <div className="max-w-xl  w-full">
          <Link to={'/teacher-training'} className="text-dark text-xl flex items-center uppercase tracking-wider">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chevron-right-icon lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>{" "}
            Back
          </Link>

          <h1 className="text-2xl py-4 tracking-wider text-dark uppercase">
            {data?.title}
          </h1>

          <div className="flex flex-col gap-y-1">
            <p className="flex items-center space-x-1 text-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-calendar-icon lucide-calendar"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="16" height="16" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>{" "}
              <p>{data?.date.split("T")[0]}</p>
            </p>
            <p className="flex items-center space-x-1 text-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-clock-icon lucide-clock"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p>
                {data?.startTime} - {data?.endTime}
              </p>
            </p>
            <p className="flex items-center space-x-1 underline text-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-map-pin-icon lucide-map-pin"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p>{data?.location}</p>
            </p>
          </div>

          {/* <p className=" mt-10 text-lg">₹{data?.price}</p> */}
        </div>
        <div className=" w-full">
          <p
            className="text-dark text-[18px]"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          ></p>
          <div className="flex space-x-8 mt-4">
            <Link to={`/moreInfo/${data?._id}`} state={{ data }} className="border uppercase  border-[#FF6950]  px-10 py-3 cursor-pointer rounded-md hover:bg-[#FF6950] transition-all duration-300 ease-in-out hover:text-white">
              More Info
            </Link>
            <button onClick={() => setContactUsPopUp(true)} className="border uppercase border-[#FF6950]  px-10 py-3 cursor-pointer rounded-md hover:bg-[#FF6950] transition-all duration-300 ease-in-out hover:text-white">
              Notify Me
            </button>
          </div>
        </div>
      </div>

      <div className="absolute fixed bottom-0 w-full z-40 md:block hidden">

        <BookingSection />
      </div>

      {contactusPopUp && (
        <div className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center px-4">
          <div className="relative w-full max-w-2xl bg-light rounded-lg shadow-lg overflow-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setContactUsPopUp(false)}
              className="absolute top-1 cursor-pointer right-2 text-black hover:text-red-500 text-4xl  z-10"
            >
              &times;
            </button>

            <div className="p-6">
              <ContactUs className="" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SingleTraining;
