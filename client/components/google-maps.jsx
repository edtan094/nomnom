import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '85%',
  height: '85%',
  margin: '15px 0 0 0'
};

function MapsComponent(props) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.maps}
        zoom={15}
      >
        <>
          <Marker position={props.maps} />
        </>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapsComponent);
