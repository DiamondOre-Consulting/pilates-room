import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-light min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl mx-auto text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="mt-6 text-3xl md:text-5xl uppercase text-dark">
          Thank You
        </h1>
        <p className="mt-4 text-dark text-base md:text-xl">
          Thank you for reaching out to{" "}
          <span className="font-bold">The Pilates Room</span>! We've received
          your message and will get back to you shortly.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 bg-black text-white px-6 py-2 rounded-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
