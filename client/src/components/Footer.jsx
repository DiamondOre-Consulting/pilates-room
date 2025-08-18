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
        src="https://res.cloudinary.com/dmpkp9ux2/image/upload/v1755157850/IMG_5911_1_o3mgov_nduy4l.jpg"
        alt="footer animation"
        className="h-[10rem] md:h-[32rem] w-full object-cover"
      />

      <section className="py-10 bg-dark text-white sm:pt-16 lg:pt-4">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 md:gap-y-12 gap-x-8 xl:gap-x-12">
            <div className="lg:col-span-4 text-white">
              <ul className="mt-6 ">
                {/* <Link to={"/contact-us"}>
                  <a
                    title=""
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Contact Us
                  </a>
                </Link> */}

                <Link to={"/terms-and--condition"}>
                  <a
                    title=""
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    terms and condition
                  </a>
                </Link>

                <Link to={"/privacy-policy"}>
                  <a
                    title=""
                    className="flex text-sm text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Privacy policy
                  </a>
                </Link>

                <Link to={"/refund-policy"}>
                  <a
                    title=""
                    className="flex text-sm text-gray-100 uppercase mt-4 transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Refund policy
                  </a>
                </Link>
              </ul>
            </div>

            <div className="lg:col-span-4 text-white">
              <ul className="mt-6  flex flex-col justify-center  text-center items-center ">
                <Link to={"/class-schedule"}>
                  <a
                    title=""
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Book a Class
                  </a>
                </Link>

                <Link to={"/contact-us"}>
                  <a
                    title=""
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Contact Us
                  </a>
                </Link>

                <Link to={"/about-us"}>
                  <a
                    title=""
                    className="flex text-sm text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    About
                  </a>
                </Link>
              </ul>
            </div>

            <div className="lg:col-span-4 w-full text-white">
              <ul className="mt-6  flex flex-col justify-center  text-center items-start md:items-center ">
                <Link to="/">
                  <a
                    title="Email Shivani"
                    className="flex text-sm mb-4 text-gray-100 transition-all duration-200 hover:text-color1 focus:text-orange-600"
                    href="mailto:shivanikher100@gmail.com"
                  >
                    shivanikher100@gmail.com
                  </a>
                </Link>
                <Link to="/">
                  <a
                    title="Call +91 9561236539"
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                    href="tel:+919561236539"
                  >
                    +91 9561236539
                  </a>
                </Link>

                <Link to={"/all-blogs"}>
                  <a
                    title=""
                    className="flex text-sm mb-4 text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Blogs
                  </a>
                </Link>

                <Link to={"/teacher-training"}>
                  <a
                    title=""
                    className="flex text-sm text-gray-100 uppercase transition-all duration-200 hover:text-color1 focus:text-orange-600"
                  >
                    Teacher training
                  </a>
                </Link>
              </ul>
            </div>
          </div>

          <hr className="mt-16 mb-10 border-gray-200" />

          <p className="text-sm text-center text-gray-100 ">
            © Copyright 2025, All Rights Reserved by THE PILATES ROOM
          </p>

          <p className="text-sm text-center mt-4 text-gray-100 ">
            Designed & Developed by{" "}
            <Link
              to={"https://www.doclabz.com/"}
              target="_blank"
              className="underline tracking-wide"
            >
              DOCLABZ
            </Link>
          </p>

          {/* / </div> */}
        </div>
      </section>
    </div>
  );
};

export default Footer;
