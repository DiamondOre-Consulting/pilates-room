import React from "react";

const ContactUs = () => {


  return (
    <div className="bg-light">
      <div className="py-10 md:max-w-4xl mx-auto px-4 md:px-0 ">
        <div className="max-w-xl mx-auto ">
          <h1 className="text-uppercase text-center text-3xl md:text-5xl uppercase text-dark">
            Let's keep in touch
          </h1>
          <p className="mt-4 text-dark text-base md:text-xl text-center ">
            Receive the latest news, updates, offers and goings on from Exhale
            Pilates. Don’t worry, we will never pass on your details to someone
            else. Simply subscribe below.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-y-4">
          <input
            className="py-4 px-2 w-full border-gray-100 bg-white"
            placeholder="First Name"
          />

          <input
            className="py-4 px-2 w-full border-gray-100 bg-white"
            placeholder="Email"
          />
          <input
            className="py-4 px-2 w-full border-gray-100 bg-white"
            placeholder="Phone Number (optional)"
          />
          {/* <select className="py-4 px-2 w-full border-gray-100 bg-white text-gray-600">
            <option>How did you hear about Exhale (optional)</option>
            <option>How did you hear about Exhale (optional)</option>
            <option>How did you hear about Exhale (optional)</option>
            <option>How did you hear about Exhale (optional)</option>
          </select> */}
          {/* 
          <div className="flex w-full justify-between text-gray-700 mt-4 ">
            <p>Get updates on events and our latest offers</p>

            <div className="flex space-x-4 text-xl text-gray-600">
              <p className="flex items-center space-x-2">
                <input type="checkbox" className="size-5" /> <span>Email</span>
              </p>
              <p className="flex items-center space-x-2">
                <input type="checkbox" className="size-5" /> <span>Text</span>
              </p>
            </div>
          </div> */}

          <button className="bg-black cursor-pointer  text-white w-full px-4 py-2 mx-auto rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
