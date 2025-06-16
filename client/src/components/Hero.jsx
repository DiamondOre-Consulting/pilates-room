import React from "react";
import banner from "../assets/home.webm";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div>
      <section className="relative h-[80vh] md:h-screen flex flex-col items-center justify-center text-center text-white overflow-x-hidden">
        <div className=" absolute top-0 left-0 w-full h-full overflow-hidden">
          <video
            className="min-w-full min-h-full border absolute object-cover"
            src={banner}
            autoPlay
            muted
            loop
          ></video>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/40  z-10"></div>
        <div className="video-content w-sm md:w-4xl  flex flex-col gap-4  z-10">
          <h1 className="text-[2rem] md:text-[5rem] md:leading-24 ">
            Pioneering Classical <br /> Pilates In North India
          </h1>
          <Link
            to={"/intro-offers"}
            className="uppercase border w-fit mx-auto text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer border-white px-4 py-1 rounded-md text-xl hover:bg-[#FF6950]"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;
