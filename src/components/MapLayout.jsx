import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker issue with Leaflet in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customMarker = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "var(--radius)",
};

const position = [49.4521, 11.0767]; // Example: Erlangen, Germany

const MapLayout = () => {
  return (
    <div className="w-full bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="border border-border rounded-lg overflow-hidden shadow-sm">
          <MapContainer
            center={position}
            zoom={10}
            style={containerStyle}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={customMarker}>
              <Popup>Jimmy's Apartment</Popup>
            </Marker>
          </MapContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Powered by OpenStreetMap (No API Key Required)
        </p>
      </div>
    </div>
  );
};

export default MapLayout;