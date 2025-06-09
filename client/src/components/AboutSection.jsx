import React from "react";

const AboutSection = () => {
  return (
    <div>
      <section className="ezy__about1 bg-dark py-14 md:py-24  dark:bg-[#0b1727] text-white dark:text-white">
        <div className=" px-4">
          <div className="flex flex-col md:flex-row gap-10 md:gap-20  justify-center items-center md:items-start  mx-auto">
            <div className="text-start flex flex-col justify-start items-center   ">
              <h2 className="  w-full text-4xl md:text-[5rem] leading-wide md:leading-tight text-center">
                Welcome to
              </h2>
              <h2 className=" w-full text-4xl md:-mt-4  md:text-[5rem] leading-wide md:leading-tight text-center md:text-left">
                The Pilates Room
              </h2>
            </div>
            <div className="md:w-1/2 mt-5 space-y-6 lg:pr-4">
              <p className="text-base tracking-widest opacity-80 text-center md:text-left">
                The Pilates Room is the brainchild of Shivani Kher. Having
                completed her certifications from Core Pilates NYC, she has
                pioneered Classical Pilates in North India, by inaugurating the
                first Classical Pilates studio of its kind in the city of Delhi.{" "}
              </p>
              <p className="text-base tracking-widest opacity-80 text-center md:text-left">
                As a third-generation Pilates instructor, Shivani carries the
                torch of a legacy established generations ago. Her journey began
                under the esteemed guidance of Core Pilates NYC, equipping her
                with a dual certification that lays the foundation for her
                expertise. She currently thrives under the mentorship of Alycea
                Ungaro, a second-generation Pilates instructor, further
                deepening her understanding and refining her practice.
              </p>
              <p className="text-base tracking-widest opacity-80  mb-0 text-center md:text-left">
                For over six years, Shivani has not only learned but also honed
                her skills as a teacher. This experience allows her to connect
                with and guide clients of all levels, ensuring their journeys
                are personalized and transformative.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
