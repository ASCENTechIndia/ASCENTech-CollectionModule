import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const MapViewPage = () => {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get('lat'));
  const lng = parseFloat(searchParams.get('lng'));
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_PUBLIC_KEY;

  if (isNaN(lat) || isNaN(lng)) {
    return <div className="p-4 text-center text-red-600">Invalid coordinates provided.</div>;
  }

  if (!apiKey) {
    return <div className="p-4 text-center text-red-600">Google Maps API key is missing.</div>;
  }

  const center = { lat, lng };
  const containerStyle = { width: '100vw', height: '100vh' };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{ gestureHandling: 'greedy' }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapViewPage;