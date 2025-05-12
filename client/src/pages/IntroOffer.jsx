import React, { useEffect, useState } from "react";
import banner from "../assets/banner.mp4";
import BookingSection from "@/components/BookingSection";
import ContactUs from "@/components/ContactUs";
import { useDispatch } from "react-redux";
import { getAllPackages } from "@/Redux/Slices/packageSlice";
const IntroOffer = () => {
  const dispatch = useDispatch();
  const [allPackages, setAllPackages] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const handleGetAllPackages = async () => {
    try {
      const response = await dispatch(getAllPackages({ page, limit }));
      console.log(response);
      setAllPackages(response?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllPackages();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(allPackages);
  return (
    <div>
      <div>
        <section className="relative h-[80vh] md:h-screen flex flex-col items-center justify-center text-center text-white ">
          <div className=" absolute top-0 left-0 w-full h-full overflow-hidden">
            <video
              className="min-w-full min-h-full border absolute object-cover"
              src={banner}
              autoPlay
              muted
              loop
            ></video>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40  z-10"></div>
          <div className="video-content max-w-4xl leading-22  md:-mt-28 z-10">
            <h1 className="text-[2rem] md:text-[5rem] uppercase">
              Intro Offers
            </h1>
            {/* <button className="uppercase border text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer border-white px-4 py-1 rounded-md text-xl hover:bg-[#FF6950]">Get Started</button> */}
          </div>
        </section>
      </div>

      <div className="absolute fixed bottom-0 w-full z-40 md:block hidden">
        <BookingSection />
      </div>

      {allPackages.map((pkg, index) => (
        <div
          className={`flex md:px-0 px-4  flex-col md:flex-row md:space-y-0 space-y-4 ${
            index % 2 === 0
              ? "bg-dark text-white "
              : "bg-white flex-col md:flex-row-reverse"
          }  py-20`}
        >
          <div className="flex flex-col justify-center  items-center space-y-4 max-w-xl mx-auto ">
            <h1 className="text-4xl uppercase">{pkg?.title}</h1>
            <p
              className={`text-center ${
                index % 2 === 0 ? "text-gray-200" : "text-black "
              } text-center`}
              dangerouslySetInnerHTML={{ __html: pkg?.description }}
            ></p>

            <button className="text-xl bg-white text-dark rounded-md px-4 py-1">
              Buy Now{" "}
            </button>
          </div>

          <div
            className="justify-center items-center w-full md:w-[35rem] flex mx-auto rounded-lg h-80 "
            style={{
              backgroundImage: `url('${pkg?.image?.secureUrl}')`,
              backgroundSize: "cover",
            }}
          >
            {/* <img
        src="https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg"
        className="w-[30rem] h-[25rem]  objet-cover  rounded-lg"
        alt=""
      /> */}
          </div>
        </div>
      ))}

      <ContactUs />
    </div>
  );
};

export default IntroOffer;
