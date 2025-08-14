import React, { useEffect } from "react";
import banner from "../assets/home.webm";
import About from "@/components/TeacherTrainingComponents/About";
import ProgramSchedule from "@/components/TeacherTrainingComponents/ProgramSchedule";
import Testimonial from "@/components/Testimonial";

const TeacherTraining = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <section className="relative h-[60vh] md:h-screen w-full overflow-hidden flex items-center justify-center text-center text-white">
          {/* Background Image with Perfect Alignment */}
          <div className="absolute inset-0 w-full h-full">
            <img
              className="absolute w-full h-full object-cover object-center"
              src="https://res.cloudinary.com/dmpkp9ux2/image/upload/v1755148044/IMG_2124_j4vccq.jpg"
              alt="Pilates instructor demonstrating technique"
              loading="eager"
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          {/* Content Centered Vertically and Horizontally */}
          <div className="relative top-40 z-20 w-full px-4">
            <div className="max-w-4xl mx-auto transform md:-translate-y-10">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider mb-4">
                Teacher Training
              </h1>
            </div>
          </div>
        </section>
      </div>
      <About />
      <section className="px-4 md:px-8 lg:px-20 py-10 md:py-16 w-full">
        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl">
          <video
            className="w-full h-auto aspect-video object-cover"
            src="https://res.cloudinary.com/dmpkp9ux2/video/upload/v1755151651/IMG_3576_ecsoyi.mov"
            controls
            autoPlay
            muted
            playsInline
            loop
          ></video>
        </div>
      </section>
      <ProgramSchedule />
      <Testimonial />
      {/* <CrouselSection /> */}
      {/* <RecommendedBy /> */}
    </>
  );
};

export default TeacherTraining;
