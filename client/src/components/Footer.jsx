import React from "react";
import { Link } from "react-router-dom";
import { CiPhone } from "react-icons/ci";
import { FaRegEnvelope } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import fromgif from "../assets/footergif.gif";

const Footer = () => {
  return (
    <div>
      <img
        src={fromgif}
        alt="footer animation"
        className="h-[10rem] md:h-[28rem] w-full object-cover"
      />

      <section className="py-10 bg-dark text-white sm:pt-16 lg:pt-4">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 xl:gap-x-12">
            <div className="lg:col-span-4 text-white">
              <ul className="mt-6 ">
                <Link to={"/contact-us"}>
                  <a
                    title=""
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Contact Us
                  </a>
                </Link>

                <Link to={"/"}>
                  <a
                    title=""
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    terms and condition
                  </a>
                </Link>

                <Link to={"/"}>
                  <a
                    title=""
                    className="flex text-sm text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Privacy ploicy
                  </a>
                </Link>
              </ul>
            </div>

            <div className="lg:col-span-4 text-white">
              <ul className="mt-6  flex flex-col justify-center  text-center items-center ">
                <Link to={"/"}>
                  <a
                    title=""
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Location
                  </a>
                </Link>

                <Link to={"/"}>
                  <a
                    title=""
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Our team
                  </a>
                </Link>

                <Link to={"/"}>
                  <a
                    title=""
                    className="flex text-sm text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Work at exhale
                  </a>
                </Link>
              </ul>
            </div>

            <div className="lg:col-span-4 w-full text-white">
              <ul className="mt-6  flex flex-col justify-center  text-center items-center ">
                <Link to={"/"}>
                  <a
                    title=""
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    +91 34354645456
                  </a>
                </Link>

                <Link to={"/"}>
                  <a
                    title=""
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Our team
                  </a>
                </Link>

                <Link to={"/"}>
                  <a
                    title=""
                    className="flex text-sm text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Work at exhale
                  </a>
                </Link>
              </ul>
            </div>
          </div>

          <hr className="mt-16 mb-10 border-gray-200" />

            <p className="text-sm text-center text-gray-100 ">
              © Copyright 2024, All Rights Reserved by DocLabz
            </p>

       
         {/* / </div> */}
        </div>
      </section>
    </div>
  );
};

export default Footer;
