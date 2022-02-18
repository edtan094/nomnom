import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

function MapsComponent(props) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.maps}
        zoom={14}
      >
        <>
        <Marker position={props.maps}/>
        </>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapsComponent);
