import React from "react";
import banner from "../assets/banner.mp4";
const Hero = () => {
  return (
    <div>
      <section className="relative h-screen flex flex-col items-center justify-center text-center text-white ">
    
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
        <div className="video-content max-w-4xl leading-22  -mt-28 z-10">
          <h1 className="text-[2rem] md:text-[5rem] uppercase">Londons most loved Pilates Studio</h1>
          <button className="uppercase border text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer border-white px-4 py-1 rounded-md text-xl hover:bg-[#FF6950]">Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
