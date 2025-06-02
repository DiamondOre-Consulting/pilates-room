import React from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";

const Testimonial = () => {
  const testimonials = [
    {
      quote:
        "Since joining The Pilates Room, I've noticed a significant difference in my core strength and posture. Shivani's expertise in Classical Pilates has been instrumental in helping me achieve these results. The focus on precise movements and controlled breathing has not only improved my physical well-being but also my overall sense of balance and coordination",
      name: "Vaishali Gaur",
      designation: "Stronger Core, Improved Posture",
      src: t2,
    },
    {
      quote:
        "I came to The Pilates Room seeking relief from chronic back pain. Shivani's personalized Classical Pilates sessions have been a game-changer. Through targeted exercises and the use of authentic equipment, I've experienced a significant reduction in pain and a noticeable improvement in my flexibility. I highly recommend The Pilates Room to anyone looking for a safe and effective way to manage pain and improve their overall movement",
      name: "Rishabh",
      designation: "Pain Relief, Increased Flexibility",
      src: t3,
    },
    {
      quote:
        "I never thought I'd enjoy an exercise program like I do at The Pilates Room. Shivani's passion for Classical Pilates is contagious! The classes are challenging yet invigorating, and the focus on proper form ensures I'm getting the most out of each workout. The studio also fosters a welcoming and supportive environment, making it a joy to come back each session.",
      name: "Shaara",
      designation: "Fun Workouts, Supportive Community",
      src: t1,
    },
  ];
  return (
    <div className="py-10 overflow-x-hidden">
      <h1 className=" text-5xl text-dark text-center ">Testimonials</h1>
      <AnimatedTestimonials testimonials={testimonials} className="" />
    </div>
  );
};

export default Testimonial;
