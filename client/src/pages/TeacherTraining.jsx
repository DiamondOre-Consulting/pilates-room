import React, { useEffect } from 'react'
import banner from "../assets/banner.mp4";
import About from '@/components/TeacherTrainingComponents/About';
import ProgramSchedule from '@/components/TeacherTrainingComponents/ProgramSchedule';
import Testimonial from '@/components/Testimonial';
import RecommendedBy from '@/components/RecommendedBy';
import CrouselSection from '@/components/TeacherTrainingComponents/CrouselSection';
const TeacherTraining = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
   <>
      <div>
          <section className="relative h-[60vh] md:h-screen flex flex-col items-center justify-center text-center text-white ">
        
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
            <div className="video-content max-w-4xl leading-22  md:-mt-28 z-10">
              <h1 className="text-[2rem] md:text-[5rem] uppercase">Teacher Training</h1>
              {/* <button className="uppercase border text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer border-white px-4 py-1 rounded-md text-xl hover:bg-[#FF6950]">Get Started</button> */}
            </div>
          </section>
          
        </div>
   <About/>
   <section className='px-8 md:px-20 py-10'>
    <video src='https://exhalepilateslondon.com/wp-content/uploads/2023/01/Gaby-to-camera-2-intro.mp4' className='rounded-2xl' controls autoplay muted/>
   </section>
   <ProgramSchedule/>
   <Testimonial/>
   <CrouselSection/>
   <RecommendedBy/>
   </>
  )
}

export default TeacherTraining