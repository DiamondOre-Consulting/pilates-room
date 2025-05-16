import React from 'react'

const RecommendedBy = () => {

    const clientLogos = [
        {
            logo: "https://exhalepilateslondon.com/wp-content/uploads/2022/11/VOGUE_LOGO.svg_.png",
            alt: "",
        },
        {
            logo: "https://exhalepilateslondon.com/wp-content/uploads/2022/11/VOGUE_LOGO.svg_.png",
            alt: "",
        },
        {
            logo: "https://exhalepilateslondon.com/wp-content/uploads/2022/11/VOGUE_LOGO.svg_.png",
            alt: "",
        },
        {
            logo: "https://exhalepilateslondon.com/wp-content/uploads/2022/11/VOGUE_LOGO.svg_.png",
            alt: "",
        },
        {
            logo: "https://exhalepilateslondon.com/wp-content/uploads/2022/11/VOGUE_LOGO.svg_.png",
            alt: "",
        },
        {
            logo: "https://exhalepilateslondon.com/wp-content/uploads/2022/11/VOGUE_LOGO.svg_.png",
            alt: "",
        },
        {
            logo: "https://exhalepilateslondon.com/wp-content/uploads/2022/11/VOGUE_LOGO.svg_.png",
            alt: "",
        },
        {
            logo: "https://exhalepilateslondon.com/wp-content/uploads/2022/11/VOGUE_LOGO.svg_.png",
            alt: "",
        },
    ];
  return (
    <div>
        	<section className="ezy__clients16  py-14 md:py-10 bg-white dark:bg-[#0b1727] dark:text-white">
			<div className=" px-4">
			
				
						<h2 className="text-4xl mb-6  leading-none text-center text-dark ">
                        Recommended By
						</h2>
					
			
                <marquee>
				<div className="flex  items-center justify-center gap-6">
					{clientLogos.map((client, i) => (
						<img
							src={client.logo}
							alt={client.alt}
							className="max-h-11 h-auto max-w-full grayscale mx-4 transition-all duration-500 ease-in-out hover:grayscale-0 pr-12 mt-6"
							key={i}
						/>
					))}
				</div>
                </marquee>
			</div>
		</section>
    </div>
  )
}

export default RecommendedBy
