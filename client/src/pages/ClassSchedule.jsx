import React from "react";
import { SlCalender } from "react-icons/sl";

const ClassSchedule = () => {
  return (
    <div>
      <section class="w-full">
        <div class="w-full h-[22rem] bg-[url('https://exhalepilateslondon.com/wp-content/uploads/2022/11/class-schedule.jpg')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center ">
          <div>
            <h1 class="text-white text-center xl:text-7xl lg:text-4xl md:text-3xl sm:text-2xl :text-xl ">
              Class Shedule
            </h1>
          </div>
        </div>
      </section>

      <section className="py-10 px-10 ">
        <p className="text-gray-400 mr-0 mb-4 ">My Account</p>
        <div className="flex  justify-between">
          <div>
            <h1 className="text-3xl">Find a Class</h1>
          </div>
          <div className="flex flex-col justify-end items-end ">
            <div className="flex space-x-6">
              <select className="border rounded-md px-4 py-2 border-gray-300">
                <option>Location</option>
              </select>

              <select className="border rounded-md px-4 py-2 border-gray-300">
                <option>class Type</option>
              </select>

              <select className="border rounded-md px-4 py-2 border-gray-300">
                <option>Instructor</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between bg-black">
            <p>July</p>
            <div>
            <SlCalender />
            <p>Full Calender</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ClassSchedule;
