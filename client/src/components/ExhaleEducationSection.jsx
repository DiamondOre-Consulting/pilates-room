import React from "react";
import { Link } from "react-router-dom";

const ExhaleEducationSection = () => {
  return (
    <div>
      <div>
        <section className="ezy__blog6 light py-14 md:py-10 text-stone-800 bg-white dark:bg-[#0b1727] dark:text-white overflow-hidden">
          <div className=" px-4  mx-auto md:px-8 xl:px-20">
            <h2 className="text-[32px] text-dark uppercase  lg:text-[45px] text-center text-light leading-none mb-4">
              Exhale Education
            </h2>

            <div className="flex flex-col md:flex-row justify-between w-full gap-y-8 md:gap-y-0 md:gap-x-20  items-center mt-12 ">
              <div className="flex flex-col justify-center items-center md:items-start ">
                <article className="rounded-lg ">
                  <div className="relative">
                    <img
                      src="https://exhalepilateslondon.com/wp-content/uploads/2023/01/PRIMROSE-1-scaled.jpg"
                      className="h-80 w-full mb-6 rounded-lg shadow-lg dark:shadow-none"
                    />
                  </div>
                </article>

                <Link to={'/teacher-training'} className="border text-dark border-gray-800 text-xl uppercase  px-8 py-1 cursor-pointer rounded-md hover:bg-[#FF6950] transition-all duration-300 ease-in-out hover:text-white">
                    Teacher Training
                </Link>
              </div>


              <div className="flex flex-col justify-start items-center md:items-end ">
                <article className="rounded-lg ">
                  <div className="relative">
                    <img
                      src="https://exhalepilateslondon.com/wp-content/uploads/2023/01/PRIMROSE-1-scaled.jpg"
                      className="h-80 w-full mb-6 rounded-lg shadow-lg dark:shadow-none"
                    />
                  </div>
                </article>

                <button className="border text-dark border-gray-800 text-xl uppercase  px-8 py-1 cursor-pointer rounded-md hover:bg-[#FF6950] transition-all duration-300 ease-in-out hover:text-white">
                 Workshps
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExhaleEducationSection;
