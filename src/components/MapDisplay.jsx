import React from "react";

const MapDisplay = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
        <img
          src="/path-to-your-map-image.jpg" 
          alt="Map"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default MapDisplay;
