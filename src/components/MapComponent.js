import React from 'react';

const MapComponent = ({ location }) => {
  console.log('Received location:', location);

  if (!location || (!location.name && !location.lat && !location.lon)) {
    console.error('Invalid location data:', location);
    return <div>No location data available</div>;
  }

  const getHereMapUrl = (city) => {
    const zoomLevel = 12;
    const width = 350;
    const height = 350;
    const apiKey =  'ZIctrnR0UeGuAZCvApk3N_GSutHSvEMQV2ZGVJfcmxs';
    const marker = `&poi=${city.lat},${city.lon}`;
    
    return `https://image.maps.ls.hereapi.com/mia/1.6/mapview?c=${city.lat},${city.lon}&z=${zoomLevel}&apiKey=${apiKey}&w=${width}&h=${height}${marker}`;
  };
  
  

  console.log('Map URL:', getHereMapUrl(location));

  return (
    <div>
      <img src={getHereMapUrl(location)} alt={`Map for ${location.name}`} />
    </div>
  );
};

export default MapComponent;
