import AboutSection from '@/components/AboutUsComponents/AboutSection'
import OurTeam from '@/components/AboutUsComponents/OurTeam'
import React, { useEffect } from 'react'


const Aboutus = () => {

  
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      

      
  return (
    <div>
        <AboutSection/>
      <OurTeam/>
    </div>
  )
}

export default Aboutus