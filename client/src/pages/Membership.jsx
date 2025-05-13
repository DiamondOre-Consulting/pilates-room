import { getMemberShipPackage } from "@/Redux/Slices/MembershpPackageSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Membership = () => {
  const [allMemberShip, setAllMemberShip] = useState([]);
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState("Monthly");

  const handleGetAllMemberShip = async () => {
    try {
      const response = await dispatch(getMemberShipPackage(selectedPlan.toLowerCase()));
      setAllMemberShip(response?.payload?.data);
      console.log(response?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    handleGetAllMemberShip();
  }, [selectedPlan]);
  return (
    <div>
      <section class="w-full">
        <div class="w-full h-[28rem] bg-[url('https://exhalepilateslondon.com/wp-content/uploads/2022/11/class-schedule.jpg')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center ">
          <div>
            <h1 class="text-white text-center xl:text-7xl uppercase lg:text-4xl md:text-4xl sm:text-4xl text-4xl ">
              Book Membership
            </h1>
          </div>
        </div>
      </section>

      <section className="ezy__pricing10 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
        <div className="container px-4">
          <div className="grid ">
            <div className="flex flex-col items-center justify-center mb-4">
              <h3 className="text-3xl leading-none md:text-[45px] text-gray-800 font-bold mb-2">
                Our Membership plans
              </h3>

              <div className="flex items-center my-2 justify-center gap-2 bg-dark rounded-full p-1 text-white w-fit mx-auto">
                {["Monthly", "Quarterly", "Yearly"].map((label, index) => (
                  <button
                    key={index}
                    className={`px-4 py-1 rounded-full cursor-pointer text-sm font-semibold transition-all ${
                      selectedPlan === label
                        ? "bg-white text-black"
                        : "bg-transparent text-white"
                    }`}
                    onClick={() => setSelectedPlan(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center"
            // key={i}
          >
            {allMemberShip?.map((ele) => (
              <div className="bg-gray-100 dark:bg-slate-800  h-full flex flex-col">
                <div className="grow">
                  <div className="pt-6 bg-dark text-white  rounded-t-2xl">
                    <p className="leading-[60px]">
                      <p className="text-4xl">{ele?.packageName}</p>
                      <span className=" mr-1 text-2xl">₹</span>
                      <span className="text-xl ">{ele?.perSessionPrice}</span>
                      <span className="text-xl"> / {ele?.packageType}</span>
                    </p>
                  </div>
                  <div className="py-6 mb-6 flex flex-col text-wrap">
                    <p>Price : - {ele?.price}</p>
                    <p>Total Sessions : - {ele?.totalSessions}</p>
                    <p>Validy upto : - {ele?.validity}</p>

                    <p
                      className="text-wrap  mx-auto overflow-x-auto px-10 mt-4"
                      dangerouslySetInnerHTML={{ __html: ele?.description }}
                    ></p>
                  </div>
                </div>

                <div className="pb-8">
                  <a
                    href="#!"
                    className="bg-dark px-8 py-3 rounded text-white hover:bg-opacity-90 duration-300 mt-12 mb-2"
                  >
                    Book NOw
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
