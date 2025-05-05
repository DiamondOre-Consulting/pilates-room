import React, { useState } from 'react';
import { Button } from "@/components/ui/button"

const Home = () => {
  const [showText, setShowText] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center space-y-6">
      <p className="text-sm text-gray-400">Trusted by 1.5M Coders</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
         Devi - Fast &amp; Scalable Development
      </h1>
      <h2 className="text-2xl md:text-3xl font-normal text-orange-500">
        Make your development experience smooth and scalable
      </h2>
      <p className="text-gray-300 max-w-2xl">
         Devi is an open-source package that helps you set up your project quickly and efficiently.
        It is also a community-driven project, so feel free to contribute if you have any ideas or features you'd like to add.
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-gray-300">
        <span>💻 Fast setup</span>
        <span>📦 Ready-to-use</span>
        <span>🔍 Scalable</span>
        <span>🤝 Community</span>
        <span>📝 Documentation</span>
      </div>
      <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 text-lg">
        Check all Live Cohorts
      </button>
    </div>
  );
};

export default Home;
