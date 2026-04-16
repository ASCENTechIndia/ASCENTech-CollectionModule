import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const MapViewPage = () => {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get('lat'));
  const lng = parseFloat(searchParams.get('lng'));
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_PUBLIC_KEY;

  if (isNaN(lat) || isNaN(lng)) {
    return <div className="p-4 text-center text-red-600">Invalid coordinates provided.</div>;
  }

  const center = { lat, lng };

  return (
    <div className="h-screen w-full">
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: '100%', height: '100%' }}
          defaultCenter={center}
          defaultZoom={15}
          gestureHandling="greedy"
        >
          <Marker position={center} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapViewPage;