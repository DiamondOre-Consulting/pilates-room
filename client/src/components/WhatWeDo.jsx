import React from "react";
import { Link } from "react-router-dom";

const WhatWeDo = () => {
  return (
    <div className="py-10 bg-light">
      <div className="flex flex-col justify-center items-center max-w-xl mx-auto space-y-4">
        <h1 className="text-5xl text-dark">What We Do</h1>
        <p className="text-center mt-6 text-dark md:px-0 px-4">
          The Pilates philosophy and movement patterns were designed by Joseph
          Pilates almost 100 years ago during World War I in an attempt to
          rehabilitate those wounded from the war. Over the years, this
          technique has been widely acclaimed by rehabilitation specialists and
          has gained popularity by the public at large. It’s worth nothing that
          this form of movement was created by a man, for men!
        </p>
        {/* <p className="text-dark">
          There’s a class for everyone at Exhale. Find yours now.
        </p> */}
        <Link
          to={"/class-schedule"}
          className="border text-dark bg-white hover:text-white mt-6 border-gray-800 text-xl uppercase  px-8 py-1 cursor-pointer rounded-md hover:bg-[#FF6950] transition-all duration-300 ease-in-out hover:text-white"
        >
          View class timetable
        </Link>
      </div>

      <div className="flex justify-between flex-wrap gap-y-10 mt-20 px-4 md:px-20">
        <div className="flex flex-col justify-center  items-center">
          <div className="w-full md:w-84 h-80 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
            <img
              src="https://exhalepilateslondon.com/wp-content/uploads/2023/01/PRIMROSE-1-scaled.jpg"
              alt="Car Image"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-light text-dark px-4 text-center bg-opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out flex items-center justify-center">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto, laborum, hic earum officia sit, quibusdam blanditiis
                saepe nesciunt sapiente nihil dolores et? Ad adipisci quos nisi,
                earum veritatis deleniti nesciunt.
              </p>
            </div>
          </div>
          <Link
            to={"/why-pilates"}
            className="border text-dark border-gray-800 mt-4  text-xl uppercase  px-8 py-1 cursor-pointer rounded-md hover:bg-[#FF6950] transition-all duration-300 ease-in-out hover:text-white"
          >
            Why Pilates
          </Link>
        </div>

        <div className="flex flex-col justify-center  items-center">
          <div className="w-full md:w-84 h-80 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
            <img
              src="https://exhalepilateslondon.com/wp-content/uploads/2023/01/PRIMROSE-1-scaled.jpg"
              alt="Car Image"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-light text-dark px-4 text-center bg-opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out flex items-center justify-center">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto, laborum, hic earum officia sit, quibusdam blanditiis
                saepe nesciunt sapiente nihil dolores et? Ad adipisci quos nisi,
                earum veritatis deleniti nesciunt.
              </p>
            </div>
          </div>
          <Link
            to={"/teacher-training"}
            className="border text-dark border-gray-800 mt-4  text-xl uppercase  px-8 py-1 cursor-pointer rounded-md hover:bg-[#FF6950] transition-all duration-300 ease-in-out hover:text-white"
          >
            Teacher Training
          </Link>
        </div>

        <div className="flex flex-col justify-center  items-center">
          <div className="w-full md:w-84 h-80 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
            <img
              src="https://exhalepilateslondon.com/wp-content/uploads/2023/01/PRIMROSE-1-scaled.jpg"
              alt="Car Image"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-light text-dark px-4 text-center bg-opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out flex items-center justify-center">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto, laborum, hic earum officia sit, quibusdam blanditiis
                saepe nesciunt sapiente nihil dolores et? Ad adipisci quos nisi,
                earum veritatis deleniti nesciunt.
              </p>
            </div>
          </div>
          <Link
            to={"/private-session"}
            className="border text-dark border-gray-800 mt-4  text-xl uppercase  px-8 py-1 cursor-pointer rounded-md hover:bg-[#FF6950] transition-all duration-300 ease-in-out hover:text-white"
          >
            Private Sessions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
