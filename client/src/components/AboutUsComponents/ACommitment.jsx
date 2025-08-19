import React from "react";

const ACommitment = () => {
  return (
    <div className="px-6 md:px-20 py-16 text-gray-100 bg-dark space-y-24 ">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold text-white">
          A Commitment to Classical Pilates
        </h2>
        <p className="text-lg text-gray-200">
          Unlike many contemporary variations, Classical Pilates adheres to the
          original teachings of Joseph Pilates. This method emphasizes precise
          movements, controlled breathing, and the use of specialized equipment
          to ensure proper form and targeted muscle engagement. At The Pilates
          Room, we take our commitment to Classical Pilates a step further by
          utilizing a fully equipped studio with authentic Pilates apparatus.
          This dedication ensures you experience the practice exactly as Joseph
          Pilates intended.
        </p>
      </div>

      <h3 className="text-3xl text-center font-semibold text-gray-200">
        What Sets Our Reformers Apart?
      </h3>
      <div className="flex flex-col md:flex-row md:items-start gap-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-[#f9f9f9] p-6 rounded-xl shadow-md">
            <h4 className="text-xl font-semibold text-[#2E2E2E] mb-2">
              Superior Comfort
            </h4>
            <p className="text-gray-600">
              Our Reformers feature higher-quality padding that provides
              enhanced spinal support, making workouts more comfortable and
              suitable for individuals with sensitive backs.
            </p>
          </div>

          <div className="bg-[#f9f9f9] p-6 rounded-xl shadow-md">
            <h4 className="text-xl font-semibold text-[#2E2E2E] mb-2">
              Increased Challenge
            </h4>
            <p className="text-gray-600">
              The Reformers utilize springs with higher resistance levels,
              offering a more challenging workout that promotes faster strength
              gains and deeper muscle engagement.
            </p>
          </div>

          <div className="bg-[#f9f9f9] p-6 rounded-xl shadow-md">
            <h4 className="text-xl font-semibold text-[#2E2E2E] mb-2">
              First in India - Authentic Classical Equipment
            </h4>
            <p className="text-gray-600">
              India's first true classical Pilates equipment, faithfully crafted
              to original standards for authentic movement and superior
              performance.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold text-white">
          Pioneering Classical Pilates in North India
        </h2>
        <p className="text-lg text-gray-100">
          With The Pilates Room, Shivani brings this authentic practice to North
          India. We are proud to be one of the first dedicated Classical Pilates
          studios in the country. Shivani's vision is to familiarize people with
          the intricacies of Classical Pilates and its potential to transform
          not just their bodies, but their overall well-being.
        </p>
      </div>
    </div>
  );
};

export default ACommitment;
