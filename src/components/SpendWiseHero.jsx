import React from "react";

const SpendWiseHero = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-10">
      <div className="flex max-w-5xl w-full">
        {/* Left Section - Text Content */}
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-900">Take Control of Your Finances</h2>
          <p className="mt-4 text-gray-600">
            Join us today and start tracking your expenses effortlessly with our free trial!
          </p>
          <div className="mt-6 flex space-x-4">
            <button className="px-6 py-2 bg-black text-white rounded-md">Sign Up</button>
            <button className="px-6 py-2 border border-black text-black rounded-md">Learn More</button>
          </div>
        </div>
        {/* Right Section - Logo */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-8xl font-serif font-bold">SW</h1>
            <p className="text-lg tracking-wide mt-2">SPENDWISE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendWiseHero;
