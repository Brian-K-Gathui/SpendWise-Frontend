import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

// Define libraries as a constant outside the component
const libraries = ["marker"];

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "var(--radius)",
};

const center = {
  lat: 49.4521, // Example: Erlangen, Germany
  lng: 11.0767,
};

// Map ID is required for Advanced Markers
const mapId = "YOUR_MAP_ID_HERE";

const MapLayout = () => {
  const [map, setMap] = useState(null);
  const [advancedMarker, setAdvancedMarker] = useState(null);

  // Load the Advanced Markers library when the map is loaded
  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  // Create the advanced marker after the map and libraries are loaded
  useEffect(() => {
    if (map && window.google && window.google.maps.marker) {
      try {
        // Create a marker element
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          position: center,
          map: map,
          title: "Our Location",
        });

        setAdvancedMarker(marker);
      } catch (error) {
        console.error("Error creating advanced marker:", error);
      }
    }

    // Clean up marker on unmount
    return () => {
      if (advancedMarker) {
        advancedMarker.map = null;
      }
    };
  }, [map]);

  return (
    <div className="w-full bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="border border-border rounded-lg overflow-hidden shadow-sm">
          <LoadScript
            googleMapsApiKey="AIzaSyAQ0nPTJ_QP5JP9PdroU1U03vALPAM3dS8"
            libraries={libraries}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onMapLoad}
              mapId={mapId}
            >
              {/* Advanced markers are created via the useEffect hook */}
            </GoogleMap>
          </LoadScript>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Our location
        </p>
      </div>
    </div>
  );
};

export default MapLayout;
