import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
} from "lucide-react";
const socialIcons = [
  // { icon: Facebook, href: "https://www.facebook.com/aranyudarchitects/" },
  {
    icon: Instagram,
    href: "https://www.instagram.com/thepilatesroom_delhincr_/",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/the-pilates-room-studio/",
  },
  // { icon: Twitter, href: "#!" },
];

const Footer = () => {
  return (
    <div className="w-full ">
      <img
        src="https://res.cloudinary.com/dmpkp9ux2/image/upload/v1755157850/IMG_5911_1_o3mgov_nduy4l.jpg"
        alt="footer animation"
        className="h-[10rem] md:h-[32rem] w-full object-cover"
      />

      <section className="py-10 bg-dark text-white">
        <div className="px-4 mx-auto max-w-7xl">
          {/* Grid container with equal width columns */}
          <div className="grid grid-cols-1  md:grid-cols-3 gap-8">
            {/* Column 1 - Policies */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium uppercase">Information</h3>
              <ul className="space-y-2 pera">
                <li>
                  <Link
                    to="/in-studio-terms-and-conditions"
                    className="text-gray-100 hover:text-color1 transition"
                  >
                    In Studio Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-and-condition"
                    className="text-gray-100 hover:text-color1 transition"
                  >
                    Terms and Conditions
                  </Link>
                </li>

                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-100 hover:text-color1 transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund-policy"
                    className="text-gray-100 hover:text-color1 transition"
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 - Navigation */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium uppercase">Quick Links</h3>
              <ul className="space-y-2 pera">
                <li>
                  <Link
                    to="/class-schedule"
                    className="text-gray-100 hover:text-color1 transition"
                  >
                    Book a Class
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="text-gray-100 hover:text-color1 transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="text-gray-100 hover:text-color1 transition"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium uppercase">Contact</h3>
              <ul className="space-y-2 pera">
                <li>
                  <a
                    href="mailto:shivanikher100@gmail.com"
                    className="text-gray-100 hover:text-color1 transition"
                  >
                    shivanikher100@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919561236539"
                    className="text-gray-100 hover:text-color1 transition"
                  >
                    +91 9561236539
                  </a>
                </li>
                <li>
                  <Link
                    to="/all-blogs"
                    className="text-gray-100 hover:text-color1 transition"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/teacher-training"
                    className="text-gray-100 hover:text-color1 transition"
                  >
                    Teacher Training
                  </Link>
                </li>
              </ul>
              <div className="flex gap-4 mt-6">
                {socialIcons.map(({ icon: Icon, href }, i) => (
                  <a
                    target="_blank"
                    key={i}
                    href={href}
                    className="border border-gray-300 rounded-full p-2 hover:bg-[#33463a] hover:text-white text-gray-200 transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <hr className="mt-16 mb-10 border-gray-200" />

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-100">
              © Copyright 2025, All Rights Reserved by THE PILATES ROOM
            </p>
            <p className="text-sm text-gray-100">
              Designed & Developed by{" "}
              <Link
                to="https://www.doclabz.com/"
                target="_blank"
                className="underline hover:text-color1"
              >
                DOCLABZ
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
