import React from "react";
import { Link } from "react-router-dom";

const ExhaleEducationSection = () => {
  return (
    <div>
      <div>
        <section className="ezy__blog6 light py-14 md:py-10 text-stone-800 bg-white  dark:text-white overflow-hidden">
          <div className=" px-4  mx-auto md:px-8 xl:px-20">
            <h2 className="text-[32px] text-dark uppercase  lg:text-[45px] text-center text-light leading-none mb-4">
              Our Studios
            </h2>

            <div className="flex flex-col md:flex-row justify-between w-full gap-y-8 md:gap-y-0 md:gap-x-10 items-center mt-12">
              <div className="flex flex-col w-full justify-center items-center md:items-start">
                <article className="rounded-lg relative w-full">
                  <img
                    src="https://res.cloudinary.com/dmpkp9ux2/image/upload/v1755146025/IMG_9875.JPEG_uiqdhb.jpg"
                    className="h-80 w-full mb-6 rounded-lg shadow-lg object-cover"
                    alt="Faridabad"
                  />

                  <div className="absolute inset-0 h-80 bg-gradient-to-t from-[#00354C] via-transparent to-black/10 rounded-lg flex items-end justify-end">
                    <h2 className="text-gray-200 text-3xl tracking-wide m-4 font-semibold">
                      Faridabad
                    </h2>
                  </div>
                </article>
              </div>

              <div className="flex flex-col w-full  justify-start items-center md:items-end">
                <article className="rounded-lg relative w-full">
                  <img
                    src="https://res.cloudinary.com/dmpkp9ux2/image/upload/v1755146295/IMG_9873_1_uxvrth.jpg"
                    className="h-80 w-full mb-6 rounded-lg shadow-lg object-cover"
                    alt="Gurugram"
                  />

                  <div className="absolute inset-0  h-80 bg-gradient-to-t from-[#00354C] via-transparent to-black/10  rounded-lg flex items-end justify-end">
                    <h2 className="text-gray-200 text-3xl font-semibold m-4">
                      Gurugram
                    </h2>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExhaleEducationSection;
