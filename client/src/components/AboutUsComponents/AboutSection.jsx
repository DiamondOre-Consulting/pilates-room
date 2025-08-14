import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <div className="w-full">
      <section className="ezy__about9 light py-14 md:py-20 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-12">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 mt-6 lg:mt-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider mb-4 leading-tight">
                Welcome to The Pilates Room, where passion meets precision!
              </h1>

              <hr className="bg-dark h-1 rounded-[3px] w-12 opacity-100 my-6" />

              <div className="space-y-6">
                <p className="text-lg md:text-xl opacity-80 leading-relaxed">
                  Meet Shivani, the founder and driving force behind our studio,
                  leading the Classical Pilates Movement in North India.
                </p>

                <p className="text-lg md:text-xl opacity-80 leading-relaxed">
                  Shivani's journey with Pilates began as a quest for a
                  stronger, more balanced body. What started as personal pursuit
                  blossomed into a lifelong passion. Drawn to the rigorous
                  principles and proven effectiveness of Classical Pilates,
                  Shivani has dedicated herself to mastering and teaching this
                  transformative method.
                </p>

                <p className="text-lg md:text-xl opacity-80 leading-relaxed">
                  With certifications in both classical and contemporary
                  Pilates, Shivani brings a unique blend of traditional
                  techniques and modern understanding to every session, helping
                  clients achieve optimal alignment, core strength, and overall
                  wellness.
                </p>
              </div>
            </div>

            {/* Image Content */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
              <div className="relative w-full h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/dmpkp9ux2/image/upload/v1755155233/IMG_2149_klke4k.jpg"
                  alt="Shivani teaching Pilates"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
