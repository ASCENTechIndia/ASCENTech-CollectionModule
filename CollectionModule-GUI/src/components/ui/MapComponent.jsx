import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const VITE_GOOGLE_MAP_PUBLIC_KEY = import.meta.env.VITE_GOOGLE_MAP_PUBLIC_KEY
const MapComponent = ({ lat, lng }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };
  const center = { lat, lng };
  const zoom = 15;

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};
