import AboutSection from '@/components/AboutSection'
import BookingSection from '@/components/BookingSection'
import Hero from '@/components/Hero'
import OurStudios from '@/components/OurStudios'
import React from 'react'

const HomeMain = () => {
  return (
    <div>
      <Hero/>
      <BookingSection/>
      <AboutSection/>
      <OurStudios/>
    </div>
  )
}

export default HomeMain
