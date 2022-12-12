/* global google */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { useState } from 'react';

interface ILocations {
  locales: {
    id: number;
    name: string;
    address: string;
    working: string;
    position: {
      lat: number;
      lng: number;
    };
  }[];
}

function Map({ locales }: ILocations) {
  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    locales.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };
  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ height: '530px' }}
    >
      {locales.map(({ id, name, address, working, position }) => (
        <Marker
          key={id}
          icon={{
            url: 'https://d2dsfq4y7kldre.cloudfront.net/uploads/map-pin-1670466162.svg',
            anchor: new google.maps.Point(5, 58),
          }}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>
                <div className="">{name}</div>
                <div className="">{address}</div>
                <div className="">{working}</div>
              </div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default Map;
