import React from "react";
import { Link } from "react-router-dom";
import aboutimg from "../../assets/aboutimg.png";

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
          <div className="flex md:flex-row flex-col items-start gap-10 mb-12">
            <div className="max-w-3xl mt-10">
              <h1 className="text-2xl md:text-4xl leading-wide font-bold uppercase tracking-wider mb-2">
                Welcome to The Pilates Room, where passion meets precision!
              </h1>
              <hr className="bg-dark h-1 rounded-[3px] w-12 opacity-100 my-6" />
              <p className="opacity-70 mb-2 text-xl md:text-2xl md:tracking-wider">
                Meet Shivani, the founder and driving force behind our studio
                Leading the Classical Pilates Movement in North India
              </p>
              <p className="opacity-70 mb-2 text-xl md:text-2xl md:tracking-wider">
                Shivani's journey with Pilates began as a quest for a stronger,
                more balanced body. But what started as a personal pursuit soon
                blossomed into a lifelong passion. Drawn to the rigorous
                principles and proven effectiveness of Classical Pilates,
                Shivani delved deep into this practice.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="mt-12 lg:mt-0">
                <img
                  src={aboutimg}
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
