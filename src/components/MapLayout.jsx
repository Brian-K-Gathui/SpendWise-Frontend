import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 49.4521, // Example: Erlangen, Germany
  lng: 11.0767,
};


const MapLayout = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCgC6FL-q5uk3Om4sImWQaUNYjPKvZ7wFs"> {/* Replace with your actual API key */}
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapLayout;
