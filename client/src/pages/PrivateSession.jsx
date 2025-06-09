import React, { useState } from "react";
import banner from "../assets/home.webm";
import BookingSection from "@/components/BookingSection";
import { Link } from "react-router-dom";
import ContactUs from "@/components/ContactUs";

const PrivateSession = () => {
  const [contactusPopUp, setContactUsPopUp] = useState(false);

  const state = {
    data: {
      moreInfo: [
        {
          title: "What is a Private Session?",
          description: `Our classes are a great way to develop your Pilates practice, but for tailoring results to your unique needs and goals, nothing beats a 1-2-1 private session.`,
          image: {
            secureUrl:
              "https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg",
          },
        },
        {
          title: "What Can I Expect?",
          description: `Working with one of our highly skilled teachers in a 1-1 session is the most effective way to focus on your unique needs, challenges and personal goals. The session is 100% about you so you will be able to work specially on what you and your body need by using all studio apparatus.<br/><br/>
          Private sessions teach you exactly how the exercises should be executed and are tailored for your body to maximise your results. Working with all the Pilates apparatus, including the Reformer, Cadillac, chairs, barrels etc., your sessions will be full of variety. You will lengthen, strengthen and open the shoulders, back, arms, hips, bum, legs and feet all whilst engaging and strengthening your core for stability and balance.`,
          image: {
            secureUrl:
              "https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg",
          },
        },
        {
          title: "Is This for Me?",
          description: `A Private session is perfect if you want to refine and develop your Pilates practice whilst addressing your specific needs and goals.`,
          image: {
            secureUrl:
              "https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg",
          },
        },
      ],
    },
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
            <h1 className="text-[2rem] md:text-[5rem] uppercase">
              Private Sessions
            </h1>
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
            index % 2 === 0
              ? "bg-dark text-white"
              : "bg-white flex-col md:flex-row-reverse"
          } py-20 md:flex-row flex-col`}
        >
          <div className="flex flex-col justify-center items-center space-y-4 max-w-xl mx-auto">
            <h1 className="text-4xl uppercase">{info?.title}</h1>
            <p
              className={`text-center ${
                index % 2 === 0 ? "text-gray-200" : "text-black"
              }`}
              dangerouslySetInnerHTML={{ __html: info?.description }}
            ></p>
            <button
              onClick={() => setContactUsPopUp(true)}
              class={`group cursor-pointer relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md ${
                index % 2 === 0
                  ? "border border-white text-neutral-200"
                  : "border border-black text-natural-800"
              } px-6 font-medium `}
            >
              <span>Notify Us</span>
              <div class="ml-1 transition duration-300 group-hover:rotate-[360deg]">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
            {/* <button className={`uppercase ${index%2 === 0 ? "border border-white px-4" :"border border-blue-900 px-4"}`}>NOtify me</button> */}
          </div>

          <div
            className="justify-center items-center w-full md:w-[35rem] flex mx-auto rounded-lg h-80"
            style={{
              backgroundImage: `url('${info?.image?.secureUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      ))}

      <div className="absolute fixed bottom-0 w-full z-40 md:block hidden">
        <BookingSection />
      </div>

      {contactusPopUp && (
        <div className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center px-4">
          <div className="relative w-full max-w-2xl bg-light rounded-lg shadow-lg overflow-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setContactUsPopUp(false)}
              className="absolute top-1 cursor-pointer right-2 text-black hover:text-red-500 text-4xl  z-10"
            >
              &times;
            </button>

            <div className="p-6">
              <ContactUs setPopup={setContactUsPopUp} className="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivateSession;
