import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "var(--radius)",
};

const center = {
  lat: 49.4521, // Example: Erlangen, Germany
  lng: 11.0767,
};

const MapLayout = () => {
  return (
    <div className="w-full bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="border border-border rounded-lg overflow-hidden shadow-sm">
          <LoadScript googleMapsApiKey="AIzaSyCgC6FL-q5uk3Om4sImWQaUNYjPKvZ7wFs">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Note: Replace "YOUR_API_KEY_HERE" with your actual Google Maps API key
        </p>
      </div>
    </div>
  );
};

export default MapLayout;
