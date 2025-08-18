import React from "react";
import { Link } from "react-router-dom";

const WhatWeDo = () => {
  return (
    <div className="py-10 bg-light">
      <div className="flex flex-col justify-center items-center max-w-xl mx-auto space-y-4">
        <h1 className="text-5xl text-dark">What We Do</h1>
        <p className="text-center mt-6 text-dark md:px-0 px-4">
          Our Pilates studio offers a comprehensive approach to strength,
          flexibility, and mindful movement. We specialize in classical Pilates
          methods while incorporating modern techniques to help you achieve
          optimal body alignment, core strength, and overall wellness. Whether
          you're recovering from injury, enhancing athletic performance, or
          simply improving your posture, our programs are tailored to your
          needs.
        </p>
        <Link
          to={"/class-schedule"}
          className=" border text-white bg-[#33463a] hover:text-white mt-6 border-gray-800 text-xl uppercase px-8 py-1 cursor-pointer rounded-md hover:bg-[#2a3a2f] transition-all duration-300 ease-in-out"
        >
          View class timetable
        </Link>
      </div>

      <div className="flex  justify-between flex-wrap gap-y-10 mt-20 px-4 md:px-32">
        <div className="flex w-full md:w-fit  flex-col justify-center  items-center">
          <div className="w-full md:w-96 h-90 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
            <img
              src="https://res.cloudinary.com/dmpkp9ux2/image/upload/v1755145891/IMG_8611_zny5dy.jpg"
              alt="Pilates Class"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-light text-dark px-4 text-center bg-opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out flex items-center justify-center">
              <p>
                Pilates strengthens the core, improves posture, and enhances
                flexibility through controlled movements. Our classes focus on
                proper alignment and breathing techniques to maximize results
                while minimizing injury risk. Suitable for all fitness levels,
                from beginners to advanced practitioners.
              </p>
            </div>
          </div>
          <Link
            to={"/why-pilates"}
            className="border text-dark border-gray-800 mt-4  text-xl uppercase  px-8 py-1 cursor-pointer rounded-md  transition-all duration-300 ease-in-out hover:text-white"
          >
            Why Pilates
          </Link>
        </div>

        <div className="flex flex-col w-full md:w-fit  justify-center  items-center">
          <div className="w-full md:w-96 h-90 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
            <img
              src="https://res.cloudinary.com/dmpkp9ux2/image/upload/v1755148038/IMG_2080_xufl63.jpg"
              alt="Pilates Instructor Training"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-light text-dark px-4 text-center bg-opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out flex items-center justify-center">
              <p>
                Our comprehensive teacher training program certifies instructors
                in classical and contemporary Pilates methods. Learn anatomy,
                movement principles, and teaching techniques from master
                trainers. Whether you want to teach professionally or deepen
                your personal practice, our program provides exceptional
                training.
              </p>
            </div>
          </div>
          <Link
            to={"/teacher-training"}
            className="border text-dark border-gray-800 mt-4  text-xl uppercase  px-8 py-1 cursor-pointer rounded-md  transition-all duration-300 ease-in-out hover:text-white"
          >
            Teacher Training
          </Link>
        </div>

        <div className="flex w-full md:w-fit  flex-col justify-center  items-center">
          <div className="w-full md:w-96 h-90 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
            <img
              src="https://res.cloudinary.com/dmpkp9ux2/image/upload/v1755148040/IMG_8650_tjkwor_lyhzjl.jpg"
              alt="Private Pilates Session"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-light text-dark px-4 text-center bg-opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out flex items-center justify-center">
              <p>
                One-on-one sessions allow for personalized attention and
                customized programs. Ideal for rehabilitation, specific goals,
                or beginners wanting extra guidance. Our certified instructors
                use equipment like reformers, chairs, and barrels to create
                targeted workouts that address your unique needs and accelerate
                your progress.
              </p>
            </div>
          </div>
          <Link
            to={"/private-session"}
            className="border text-dark border-gray-800 mt-4  text-xl uppercase  px-8 py-1 cursor-pointer rounded-md  transition-all duration-300 ease-in-out hover:text-white"
          >
            Private Sessions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
