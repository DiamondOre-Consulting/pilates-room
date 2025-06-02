import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";
import ContactUs from "@/components/ContactUs";
import ExhaleEducationSection from "@/components/ExhaleEducationSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import OurStudios from "@/components/OurStudios";
import RecommendedBy from "@/components/RecommendedBy";
import Testimonial from "@/components/Testimonial";
import WhatWeDo from "@/components/WhatWeDo";
import React, { useEffect } from "react";

const HomeMain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <BookingSection />
      <AboutSection />
      {/* <OurStudios/> */}
      <ExhaleEducationSection />
      <WhatWeDo />
      <Testimonial />
      {/* <RecommendedBy /> */}
      <ContactUs />
      {/* <Footer/> */}
    </div>
  );
};

export default HomeMain;
