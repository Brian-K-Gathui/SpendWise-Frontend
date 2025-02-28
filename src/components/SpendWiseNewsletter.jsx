import React from "react";

const SpendWiseNewsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-900">Stay Updated with SpendWise</h2>
      <p className="mt-2 text-gray-600 max-w-xl">
        Join our newsletter for the latest tips and updates on managing your finances effectively.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="email"
          placeholder="Your Email Here"
          className="px-4 py-2 border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button className="px-6 py-2 bg-black text-white rounded-md">Join Now</button>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        By clicking Join Now, you agree to our Terms and Conditions.
      </p>
    </div>
  );
};

export default SpendWiseNewsletter;
