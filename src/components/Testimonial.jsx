import { FaPlay } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Testimonial = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        {/* Video Placeholder */}
        <div className="relative w-1/2 bg-black flex items-center justify-center">
          <button className="text-white bg-white p-4 rounded-full shadow-lg">
            <FaPlay className="text-black text-xl" />
          </button>
        </div>

        {/* Testimonial Content */}
        <div className="w-1/2 p-6">
          <div className="flex space-x-1 text-black">
            {Array(5).fill().map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <p className="mt-3 text-lg font-medium text-gray-900">
            "SpendWise has transformed the way I manage my expenses. I now have complete control and clarity over my finances!"
          </p>
          <p className="mt-4 font-semibold text-gray-900">Emily Johnson</p>
          <p className="text-gray-600">Finance Manager, ABC Corp</p>

          {/* Logo Placeholder */}
          <div className="mt-4 flex items-center">
            <div className="h-6 border-r border-gray-400 pr-4"></div>
            <span className="ml-4 text-lg font-semibold text-gray-900">Webflow</span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-10 flex space-x-4">
        <button className="p-2 bg-gray-200 rounded-full shadow">
          <FiArrowLeft className="text-gray-700 text-lg" />
        </button>
        <button className="p-2 bg-gray-200 rounded-full shadow">
          <FiArrowRight className="text-gray-700 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
