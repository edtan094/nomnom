import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
  margin: '15px 0 0 0'
};

function MapsComponent({ coordinates }) {
  const payload = { lat: coordinates.latitude, lng: coordinates.longitude };
  return (
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={payload}
          zoom={15}
        >
          <>
            <Marker position={payload} />
          </>
        </GoogleMap>
      </LoadScript>

  );

}

export default React.memo(MapsComponent);
