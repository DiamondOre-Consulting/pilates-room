import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper";
import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";


const crousel = [
  [
    { image: "https://exhalepilateslondon.com/wp-content/uploads/sb-instagram-feed-images/488049728_18504401440047499_3973355847526868545_nfull.webp" },
    { image: "https://exhalepilateslondon.com/wp-content/uploads/sb-instagram-feed-images/488049728_18504401440047499_3973355847526868545_nfull.webp" },
    { image: "https://exhalepilateslondon.com/wp-content/uploads/sb-instagram-feed-images/488049728_18504401440047499_3973355847526868545_nfull.webp" }
  ],
  [
    { image: "https://exhalepilateslondon.com/wp-content/uploads/sb-instagram-feed-images/488049728_18504401440047499_3973355847526868545_nfull.webp" },
    { image: "https://exhalepilateslondon.com/wp-content/uploads/sb-instagram-feed-images/488049728_18504401440047499_3973355847526868545_nfull.webp" },
    { image: "https://exhalepilateslondon.com/wp-content/uploads/sb-instagram-feed-images/488049728_18504401440047499_3973355847526868545_nfull.webp" }
  ],
  [
    { image: "https://exhalepilateslondon.com/wp-content/uploads/sb-instagram-feed-images/488049728_18504401440047499_3973355847526868545_nfull.webp" },
    { image: "https://exhalepilateslondon.com/wp-content/uploads/sb-instagram-feed-images/488049728_18504401440047499_3973355847526868545_nfull.webp" },
    { image: "https://exhalepilateslondon.com/wp-content/uploads/sb-instagram-feed-images/488049728_18504401440047499_3973355847526868545_nfull.webp" }
  ]
];

const CrouselSection = () => {
  return (
    <section className="ezy__testimonial24 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
    <div className="container px-4 mx-auto">
      <div className="flex items-center justify-center text-center mb-6 md:mb-12">
        <div className="max-w-xl">
          <hr className="w-20 mb-4 border-gray-300 dark:border-gray-600 mx-auto" />
          <h2 className="text-5xl text-dark">What They Say</h2>
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        // modules={[Autoplay, Navigation, Pagination]} // You can include the modules in this array
        className="mySwiper"
      >
        {crousel.map((slide, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {slide.map((testimonial, i) => (
                <img
                  key={i}
                  src={testimonial.image}
                  alt={`testimonial-${i}`}
                  className="w-full h-96 border border-black object-cover"
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
  );
};

export default CrouselSection;
