import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import React from "react";
import video1 from "../assets/videos/5438632-uhd_3840_2160_25fps.mp4";
import video2 from "../assets/videos/5438643-uhd_3840_2160_25fps.mp4";
import video3 from "../assets/videos/5977460-uhd_3840_2160_25fps.mp4";

const testimonials = [
  {
    video: video1,
    text: "SpendWise has transformed the way I manage my expenses. I now have complete control and clarity over my finances!",
    name: "Emily Johnson",
    role: "Finance Manager, ABC Corp",
    company: "Webflow",
  },
  {
    video: video2,
    text: "This app has helped me track my spending habits and make better financial decisions!",
    name: "John Doe",
    role: "Entrepreneur",
    company: "Startup Inc.",
  },
  {
    video: video3,
    text: "Using SpendWise has been a game-changer for me. Highly recommend it!",
    name: "Sarah Lee",
    role: "Freelancer",
    company: "Self-employed",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative">
      <div className="flex max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        {/* Video Section */}
        <div className="relative w-1/2">
          <video className="w-full h-full" controls>
            <source src={testimonials[currentIndex].video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Testimonial Content */}
        <div className="w-1/2 p-6">
          <div className="flex space-x-1 text-black">
            {Array(5).fill().map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <p className="mt-3 text-lg font-medium text-gray-900">{testimonials[currentIndex].text}</p>
          <p className="mt-4 font-semibold text-gray-900">{testimonials[currentIndex].name}</p>
          <p className="text-gray-600">{testimonials[currentIndex].role}</p>
          <div className="mt-4 flex items-center">
            <div className="h-6 border-r border-gray-400 pr-4"></div>
            <span className="ml-4 text-lg font-semibold text-gray-900">{testimonials[currentIndex].company}</span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-10 flex space-x-4">
        <button onClick={prevTestimonial} className="p-2 bg-gray-200 rounded-full shadow">
          <FiArrowLeft className="text-gray-700 text-lg" />
        </button>
        <button onClick={nextTestimonial} className="p-2 bg-gray-200 rounded-full shadow">
          <FiArrowRight className="text-gray-700 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;