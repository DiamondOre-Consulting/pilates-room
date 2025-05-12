import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const BookingSection = () => {
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  return (
    <div className="flex md:flex-row flex-col py-2 md:py-0 md:space-y-0 space-y-10 uppercase justify-between text-center md:h-20 bg-white text-xl uppercase">
      <p
        className="flex justify-center items-center w-full text-dark cursor-pointer hover:underline 
                            hover:decoration-text-dark
                            hover:text-[#FF6950]
                            underline-offset-4 
                            transition-all 
                            duration-200"
      >
        Book a Private
      </p>
      <Link
      to={'/class-schedule'}
        className="flex justify-center items-center w-full text-dark  hover:underline 
                            hover:decoration-text-dark
                             hover:text-[#FF6950]
                            underline-offset-4 
                            transition-all 
                            duration-200 md:border-x-2 border-black h-full"
      >
        Join a class
      </Link>
      <Link
      to={'/teacher-training'}
        className="flex justify-center items-center w-full text-dark  hover:underline 
                            hover:decoration-text-dark
                            underline-offset-4 
                             hover:text-[#FF6950]
                            transition-all 
                            duration-200"
      >
        Book Teacher Training
      </Link>
    </div>
  );
};

export default BookingSection;
