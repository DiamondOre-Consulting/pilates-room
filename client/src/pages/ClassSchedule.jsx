import ContactUs from "@/components/ContactUs";
import RecommendedBy from "@/components/RecommendedBy";
import FindClassSection from "@/components/TimeTable/FindClassSection";
import React, { useEffect } from "react";
import { SlCalender } from "react-icons/sl";

const ClassSchedule = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    
  return (
    <div>
      <section className="w-full">
        <div className="w-full h-[22rem] bg-[url('https://exhalepilateslondon.com/wp-content/uploads/2022/11/class-schedule.jpg')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center ">
          <div>
            <h1 className="text-white text-center xl:text-7xl lg:text-4xl md:text-4xl sm:text-4xl text-4xl ">
              Class Shedule
            </h1>
          </div>
        </div>
      </section>

      <FindClassSection/>

{/* <RecommendedBy/> */}
<ContactUs/>
    </div>
  );
};

export default ClassSchedule;
