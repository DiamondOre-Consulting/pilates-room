import React from "react";

const BookingSection = () => {
  return (
    <div className="flex md:flex-row flex-col py-2 md:py-0 md:space-y-0 space-y-10 uppercase justify-between text-center md:h-20 bg-white text-xl uppercase">
      <p
        className="flex justify-center items-center w-full text-dark cursor-pointer hover:underline 
                            hover:decoration-text-dark
                            hover:text-red-300
                            underline-offset-4 
                            transition-all 
                            duration-200"
      >
        Book a Private
      </p>
      <p
        className="flex justify-center items-center w-full text-dark  hover:underline 
                            hover:decoration-text-dark
                            underline-offset-4 
                            transition-all 
                            duration-200 md:border-x-2 border-black h-full"
      >
        Join a class
      </p>
      <p
        className="flex justify-center items-center w-full text-dark  hover:underline 
                            hover:decoration-text-dark
                            underline-offset-4 
                            transition-all 
                            duration-200"
      >
        Become a teacher
      </p>
    </div>
  );
};

export default BookingSection;
