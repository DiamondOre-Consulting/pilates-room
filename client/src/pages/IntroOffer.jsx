import React from "react";
import banner from "../assets/banner.mp4";
import BookingSection from "@/components/BookingSection";
import ContactUs from "@/components/ContactUs";
const IntroOffer = () => {
  return (
    <div>
      <div>
        <section className="relative h-screen flex flex-col items-center justify-center text-center text-white ">
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
          <div className="video-content max-w-4xl leading-22  -mt-28 z-10">
            <h1 className="text-[2rem] md:text-[5rem] uppercase">
              Intro Offers
            </h1>
            {/* <button className="uppercase border text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer border-white px-4 py-1 rounded-md text-xl hover:bg-[#FF6950]">Get Started</button> */}
          </div>
        </section>
      </div>

      <div className="absolute fixed bottom-0 w-full z-40 ">
        <BookingSection />
      </div>

      <div className="grid grid-cols-2  bg-dark  py-20">
        <div className="flex flex-col justify-center  items-center space-y-4 max-w-xl mx-auto ">
          <h1 className="text-white text-4xl">First time to Exhale</h1>
          <p className="text-gray-200 text-center">
            If you’re looking to start your Pilates journey, you’re in the right
            place! At Exhale, we teach Classical Pilates, the true works of
            Joseph Pilates. To make sure you get the best out of your
            experience, we recommend that you start with one of our intro
            offers. See which one is best suited for you below.
          </p>
          <p className="text-gray-200">
            Don’t just drop in, discover the magic of Exhale Pilates with one of
            our intro offers.
          </p>

          <button className="text-xl bg-white text-dark rounded-md px-4 py-1">
            Buy Now{" "}
          </button>
        </div>

        <div className="justify-center items-center w-[35rem] flex mx-auto rounded-lg h-80 " style={{backgroundImage : "url('https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg')" , backgroundSize : "cover"}}>
          {/* <img
            src="https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg"
            className="w-[30rem] h-[25rem]  objet-cover  rounded-lg"
            alt=""
          /> */}
        </div>
      </div>


      <div className="grid grid-cols-2  bg-white  py-20">
        <div className="flex flex-col justify-center  items-center space-y-4 max-w-xl mx-auto ">
          <h1 className="text-dark text-4xl">First time to Exhale</h1>
          <p className="text-gray-700 text-center">
            If you’re looking to start your Pilates journey, you’re in the right
            place! At Exhale, we teach Classical Pilates, the true works of
            Joseph Pilates. To make sure you get the best out of your
            experience, we recommend that you start with one of our intro
            offers. See which one is best suited for you below.
          </p>
          <p className="text-gray-700">
            Don’t just drop in, discover the magic of Exhale Pilates with one of
            our intro offers.
          </p>

          <button className="text-xl bg-white border-2 border-gray-500 text-dark rounded-md px-4 py-1">
            Buy Now{" "}
          </button>
        </div>

        <div className="justify-center items-center w-[35rem] flex mx-auto rounded-lg h-80  " style={{backgroundImage : "url('https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg')" , backgroundSize : "cover", }}>
          {/* <img
            src="https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg"
            className="w-[30rem] h-[25rem]  objet-cover  rounded-lg"
            alt=""
          /> */}
        </div>


      </div>


      <ContactUs/>
    </div>
  );
};

export default IntroOffer;
