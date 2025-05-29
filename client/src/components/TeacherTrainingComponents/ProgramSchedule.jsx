import { getAllTrainings } from "@/Redux/Slices/trainingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProgramSchedule = () => {
  const dispatch = useDispatch();
  const [allTrainings, setAllTrainings] = useState([]);
  const handleGetTrainings = async () => {
    try {
      const response = await dispatch(getAllTrainings());
      setAllTrainings(response?.payload?.data);
    } catch (error) {
      return
    }
  };

  useEffect(() => {
    handleGetTrainings();
  }, []);

  return (
    <div className="py-20 flex flex-col justify-center items-center">
      <h1 className="text-3xl md:text-5xl uppercase text-dark">
        Programme schedule
      </h1>
      <div className="grid grid-col-cols-1 md:grid-cols-3 gap-10  px-6 md:px-20 mt-16">
        {allTrainings?.map((ele) => (
          <div className="rounded-xl overflow-hidden w-full  bg-light flex flex-col">
            <a href="#"></a>
            <div className="relative">
              <a href="#" className="">
                <img
                  className="w-screen p-6 h-80 object-cover  rounded-xl"
                  src={ele?.thumbnail?.secureUrl}
                  alt="Sunset in the mountains"
                />
                <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0  "></div>
              </a>
              <a href="#!">
                <div className="text-base absolute top-0 right-0 bg-dark rounded-2xl px-4 py-1 uppercase text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                  {new Date(ele.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </a>
            </div>
            <div className="px-6 py-4 mb-auto">
              <a
                href="#"
                className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
              >
                {ele?.title}
              </a>
              <p
                className="text-gray-500 text-sm"
                dangerouslySetInnerHTML={{ __html: ele?.description }}
              ></p>
            </div>

            <div className="px-6 py-3 flex flex-row items-center  justify-between ">
              <span
                href="#"
                className="py-1 text-xs font-regular text-dark mr-1 flex flex-row items-center"
              >
                <Link
                  to={`/teacher-single-training/${ele?._id}`}
                  className="ml-1 uppercase"
                >
                  Show more{" "}
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-chevron-right-icon lucide-chevron-right text-dark"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramSchedule;
