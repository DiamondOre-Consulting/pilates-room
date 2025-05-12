import React from 'react';
import banner from "../assets/banner.mp4";
import BookingSection from '@/components/BookingSection';
import { Link } from 'react-router-dom';

const PrivateSession = () => {
  const state = {
    data: {
      moreInfo: [
        {
          title: "What is a Private Session?",
          description: `Our classes are a great way to develop your Pilates practice, but for tailoring results to your unique needs and goals, nothing beats a 1-2-1 private session.`,
          image: {
            secureUrl: "https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg"
          }
        },
        {
          title: "What Can I Expect?",
          description: `Working with one of our highly skilled teachers in a 1-1 session is the most effective way to focus on your unique needs, challenges and personal goals. The session is 100% about you so you will be able to work specially on what you and your body need by using all studio apparatus.<br/><br/>
          Private sessions teach you exactly how the exercises should be executed and are tailored for your body to maximise your results. Working with all the Pilates apparatus, including the Reformer, Cadillac, chairs, barrels etc., your sessions will be full of variety. You will lengthen, strengthen and open the shoulders, back, arms, hips, bum, legs and feet all whilst engaging and strengthening your core for stability and balance.`,
          image: {
            secureUrl: "https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg"
          }
        },
        {
          title: "Is This for Me?",
          description: `A Private session is perfect if you want to refine and develop your Pilates practice whilst addressing your specific needs and goals.`,
          image: {
             secureUrl: "https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg"
          }
        }
      ]
    }
  };

  return (
    <>
      <div>
        <section className="relative h-[80vh] md:h-screen flex flex-col items-center justify-center text-center text-white">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <video
              className="min-w-full min-h-full border absolute object-cover"
              src={banner}
              autoPlay
              muted
              loop
            ></video>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
          <div className="video-content max-w-4xl leading-22 z-10">
            <h1 className="text-[2rem] md:text-[5rem] uppercase">Private Sessions</h1>
            <Link
              to={"/intro-offers"}
              className="uppercase border text-base transition-all duration-300 ease-in-out hover:border-0 cursor-pointer border-white px-4 py-1 rounded-md text-xl hover:bg-[#FF6950]"
            >
              Book a private session
            </Link>
          </div>
        </section>
      </div>

      {state?.data?.moreInfo?.map((info, index) => (
        <div
          key={index}
          className={`flex px-4 md:space-y-0 space-y-4 ${
            index % 2 === 0 ? "bg-dark text-white" : "bg-white flex-col md:flex-row-reverse"
          } py-20 md:flex-row flex-col`}
        >
          <div className="flex flex-col justify-center items-center space-y-4 max-w-xl mx-auto">
            <h1 className="text-4xl uppercase">{info?.title}</h1>
            <p
              className={`text-center ${index % 2 === 0 ? "text-gray-200" : "text-black"}`}
              dangerouslySetInnerHTML={{ __html: info?.description }}
            ></p>
          </div>

          <div
            className="justify-center items-center w-full md:w-[35rem] flex mx-auto rounded-lg h-80"
            style={{
              backgroundImage: `url('${info?.image?.secureUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>
        </div>
      ))}

      <div className="absolute fixed bottom-0 w-full z-40 md:block hidden">
        <BookingSection />
      </div>
    </>
  );
};

export default PrivateSession;
