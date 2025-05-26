import React from 'react'

const AboutSection = () => {
  return (
    <div>
      <section className="ezy__about1 bg-dark py-14 md:py-24  dark:bg-[#0b1727] text-white dark:text-white">
			<div className=" px-4">
				<div className="flex flex-col md:flex-row gap-10  justify-end items-center  max-w-7xl mx-auto">
					<div className="text-start  flex flex-col justify-center items-center   ">
						<h2 className="  w-full text-4xl md:text-[5rem] leading-wide md:leading-tight text-center">
                        WELCOME TO 
						</h2>
                        <h2 className=" w-full text-4xl md:-mt-4  md:text-[5rem] leading-wide md:leading-tight text-center md:text-left">
                       The PILATES
						</h2>
                        <h2 className=" w-full text-4xl md:-mt-4  md:text-[5rem] leading-wide md:leading-tight text-center md:text-left">
                      ROOM
						</h2>
					</div>
					<div className="md:w-1/2 mt-5 space-y-6 lg:pr-4">
						<p className="text-base tracking-widest opacity-80 text-center md:text-left">
                        Exhale is one of the India's most well known and loved Pilates brands. Dedicated in teaching Classical Pilates, the true works of Joseph Pilates called Contrology.
						</p>
						<p className="text-base tracking-widest opacity-80 text-center md:text-left">
                        We’re a haven for the Pilates novice all the way through to the fitness enthusiast, professional athlete, and everyone in between. We’re the place Pilates teachers learn their craft because they know they’re learning from the very best. We’re where people discover how great Pilates makes you feel, and a community where everyone at every level is championed.
						</p>
						<p className="text-base tracking-widest opacity-80  mb-0 text-center md:text-left">
                        We are Exhale. We can’t wait to meet you.
						</p>
					</div>
				</div>
			</div>
		</section>
    </div>
  )
}

export default AboutSection
