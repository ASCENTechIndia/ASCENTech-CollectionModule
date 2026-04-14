// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const MapComponent = ({ lat, lng }) => {
//   const mapContainerStyle = { width: "100%", height: "400px" };
//   const center = { lat, lng };
//   console.log("cener ", center);
//   const apiKey = import.meta.env.VITE_GOOGLE_MAP_PUBLIC_KEY;

//   return (
//     <LoadScript googleMapsApiKey={apiKey}>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={15}
//       >
//         <Marker position={center} />

       
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;

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

