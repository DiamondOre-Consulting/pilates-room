import React from "react";
import { Link } from "react-router-dom";

const stories = [
  {
    text: "Beautiful and easy to understand UI.",
  },
  {
    text: "Theme advantages are pixel perfect design & clear code",
  },
  {
    text: "Present your services with flexible",
  },
  {
    text: "Find more creative ideas for your projects",
  },
  {
    text: "Faucibus porta lacus fringilla vel",
  },
];

const StoryItem = ({ item, index }) => {
  const { text } = item;
  return <>{index !== stories.length && <hr className="w-11/12 my-2" />}</>;
};

const AboutSection = () => {
  return (
    <div>
      <section className="ezy__about9 light py-14 md:pt-20 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
        <div className=" px-4 my-10">
          <div className="grid grid-cols-12 items-center gap-4 mb-12">
            <div className="col-span-12 lg:col-span-6">
              <h1 className="text-3xl leading-none font-bold uppercase tracking-wider mb-2">
                Welcome to THe PliTes Room
              </h1>
              <hr className="bg-dark h-1 rounded-[3px] w-12 opacity-100 my-6" />
              <p className="opacity-70 mb-2">
                Since our inception set out in 2012, TalEx has set out to
                disrupt inception the HR & Talent/Staffing Management industry.
                Purposefully designed by our founders (Amrita Grewal and Julie
                Dacar) to connect great companies and great talent.
              </p>
              <p className="opacity-70 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam aliquam ipsam cum accusamus, eligendi perferendis
                dolorem? Commodi dolores eos laboriosam illum earum praesentium
                dicta voluptatibus provident. Vero non aspernatur aliquid culpa
                eius? Sint voluptatem pariatur consectetur alias laborum
                molestiae quidem at doloribus explicabo delectus reprehenderit,
                dolore voluptatum laboriosam natus, repudiandae aut animi cum
                culpa impedit suscipit numquam sapiente accusamus. Sequi?
              </p>
              <ul className="flex flex-col ezy__about9-features mt-5">
                {stories.map((item, i) => (
                  <li key={i}>
                    <StoryItem item={item} index={i + 1} key={i} />
                  </li>
                ))}
              </ul>
              <div className="">
                <Link to={'/intro-offers'} className="bg-gray-900 text-white dark:bg-white dark:text-black hover:bg-opacity-90 rounded-md px-5 py-2 transition">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="mt-12 lg:mt-0">
                <img
                  src="https://exhalepilateslondon.com/wp-content/uploads/2023/01/9D4B9622.jpg"
                  alt=""
                  className="max-w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
