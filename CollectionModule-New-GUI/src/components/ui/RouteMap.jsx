import { APIProvider, Map, Marker, Polyline } from "@vis.gl/react-google-maps";

const RouteMap = ({ coordinates = [] }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_PUBLIC_KEY;

  if (!coordinates || coordinates.length === 0) return null;

  // Convert "lat,lng" strings to {lat, lng} objects
  const path = coordinates.map((coord) => {
    const [lat, lng] = coord.split(",").map(Number);
    return { lat, lng };
  });

  const center = path[0]; // first coordinate as map center
  const showPolyline = path.length > 1;

  // Helper to get marker icon URL based on index
  const getMarkerIcon = (index) => {
    if (index === 0) {
      // First marker: green
      return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    }
    if (index === path.length - 1) {
      // Last marker: red
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
    // Intermediate markers: blue
    return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  };

  return (
    <div className="p-2 rounded-lg bg-white">
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: "100%", height: "500px" }}
          defaultCenter={center}
          defaultZoom={10}
          gestureHandling="greedy"
        >
          {path.map((point, index) => (
            <Marker
              key={index}
              position={point}
              title={`Point ${index + 1}`}
              icon={getMarkerIcon(index)}
            />
          ))}

          {showPolyline && (
            <Polyline
              path={path}
              geodesic={true}
              strokeColor="#FF0000"
              strokeOpacity={1.0}
              strokeWeight={3}
            />
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default RouteMap;
