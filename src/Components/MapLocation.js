import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './map.css'

const MapLocation = ({ currentLocation, lat, lon,weatherData }) => {
  console.log(weatherData);
  console.log(weatherData.current['temp']);
  console.log(weatherData.current.temp);
  const locationUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
  const locationKey = "AIzaSyBDLwA2mhJpmE8lpQfXaLhhU24Qp4S8knM";
  const [locationName, setLocationName] = useState('');

  //get location data
  
   useEffect(async () => {
     let response = await axios(`${locationUrl}${lat},${lon}&key=${locationKey}`);
     let location = response.data.results[0];
     setLocationName(`${location.address_components[1].long_name}, 
     ${location.address_components[4].long_name}, 
     ${location.address_components[5].long_name}`);
   }, []);

  const mapStyles = {
    height: "30rem",
    width: "80%",
  };

  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }

  const onLoad = infoWindow => {
    console.log('infoWindow: ', infoWindow)
  }

  const mapContainerStyle = {
    height: "400px",
    width: "800px",
    position: "center"
  }

  const kelvinToCelsius = kelvin => (kelvin - 273.15).toFixed(2);
  return (
    <div>
      <LoadScript
        googleMapsApiKey=''>
          <div className='info'>
        <GoogleMap 
          mapContainerStyle={mapStyles}
          zoom={13}
          defaultCenter={defaultCenter}
          center={currentLocation}
        >          
          <InfoWindow 
            onLoad={onLoad}
            position={currentLocation}
          >
            <div >
              {/* temperature data on map  */}

              <p>Current Temp: {kelvinToCelsius(weatherData.current.temp)}°C</p>

              {/* using dummy data for precipitation */}
              <p>Precipitation: 1%</p>
            </div>
          </InfoWindow>
        </GoogleMap>
        </div>
      </LoadScript>
      {/* location */}
      <p className='location'>{locationName}</p>
    </div>
  )
}
export default MapLocation;
