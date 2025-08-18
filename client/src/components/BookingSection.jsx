import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const BookingSection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex    uppercase justify-between text-center items-center md:h-20 bg-white text-xl ">
      <Link
        to={"/private-session"}
        className="flex justify-center items-center w-full py-4  font-semibold text-sm   sm:text-lg md:text-xl  cursor-pointer hover:underline 
                            hover:text-[#33463a]
                            underline-offset-4 
                            transition-all 
                            duration-200"
      >
        Book Private
      </Link>

      <Link
        to={"/class-schedule"}
        className="flex justify-center items-center w-full py-4  font-semibold text-sm sm:text-lg md:text-xl h-full   hover:underline 
                             hover:text-[#33463a]
                            underline-offset-4 
                            transition-all 
                            duration-200  border-x-2 border-black "
      >
        Book class
      </Link>
      <Link
        to={"/teacher-training"}
        className="flex justify-center items-center w-full font-semibold text-sm sm:text-lg md:text-xl py-4   hover:underline 
                            underline-offset-4 
                             hover:text-[#33463a]
                            transition-all 
                            duration-200"
      >
        Teacher Training
      </Link>
    </div>
  );
};

export default BookingSection;
