import AboutSection from "@/components/AboutUsComponents/AboutSection";
import ACommitment from "@/components/AboutUsComponents/ACommitment";
import OurTeam from "@/components/AboutUsComponents/OurTeam";
import React, { useEffect } from "react";

const Aboutus = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <AboutSection />
      <ACommitment />
      <OurTeam />
    </div>
  );
};

export default Aboutus;
