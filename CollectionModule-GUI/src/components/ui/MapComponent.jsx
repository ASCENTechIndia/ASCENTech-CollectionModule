import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const MapComponent = ({ lat, lng }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_PUBLIC_KEY;
  const center = { lat, lng };
  const mapContainerStyle = { width: "100%", height: "400px" };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={mapContainerStyle}
        defaultCenter={center}
        defaultZoom={15}
      >
        <Marker position={center} />
      </Map>
    </APIProvider>
  );
};

export default MapComponent;

