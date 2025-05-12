import React, { useEffect } from "react";

const pricingList = [
  {
    price: "6000",
    list: [
      {
        detail: "1 TB STORAGE",
      },
      {
        detail: "4 session",
      },
      {
        detail: "4 weeks validity",
      },
    ],
  },
  {
    price: "6000",
    list: [
      {
        detail: "1 TB STORAGE",
      },
      {
        detail: "4 session",
      },
      {
        detail: "4 weeks validity",
      },
    ],
  },
  {
    price: "6000",
    list: [
      {
        detail: "1 TB STORAGE",
      },
      {
        detail: "4 session",
      },
      {
        detail: "4 weeks validity",
      },
    ],
  },
];

const PricingItem = ({ pricing }) => {
  const { price, list } = pricing;
  return (
    <div className="bg-gray-100 dark:bg-slate-800  h-full flex flex-col">
      <div className="grow">
        <div className="pt-6 bg-dark text-white  rounded-t-2xl">
          <p className="leading-[60px]">
            <span className="relative -top-9 text-2xl">₹</span>
            <span className="text-7xl font-thin">{price}</span>
            <span className="text-2xl">/mo</span>
          </p>
        </div>
        <div className="py-6 mb-6">
          <ul className="flex flex-col">
            {list.map((item, i) => (
              <li className="text-lg opacity-80 pb-2" key={i}>
                {item.detail}
              </li>
            ))}
          </ul>
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
  );
};

const Membership = () => {

     useEffect(() => {
          window.scrollTo(0, 0);
        }, []);

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

              <div class="flex items-center  ">
                <label class="relative cursor-pointer">
                  <input type="checkbox" class="sr-only peer" />
                  <div class="w-[102px] h-9 flex items-center bg-dark rounded-full text-[10px] peer-checked:text-black text-gray-800 font-extrabold after:flex after:items-center after:justify-center peer after:content-['monthly'] peer-checked:after:content-['Quarterly'] peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-7 after:w-12 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:px-32">
            {pricingList.map((pricing, i) => (
              <div
                className="col-span-12 md:col-span-6 xl:col-span-4 text-center"
                key={i}
              >
                <PricingItem pricing={pricing} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
