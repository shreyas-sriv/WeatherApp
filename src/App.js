import React, {useState, useEffect} from 'react';
import { WeatherApp } from './Components/WeatherApp';
import './App.css';

function App() {

  const [latitude,setLatitude] = useState(11);
  const [longitude,setLongitude] = useState(11);
  const [ currentLocation, setCurrentLocation ] = useState({});
  const [status,setStatus] = useState('');

  useEffect(()=>{
    getLocation();
  },[]);
  
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(currentPosition, errorPosition);
    }
  };
  function currentPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
     setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
     });
     setStatus('success')
  
  }
  function errorPosition() {
    console.log('could not locate');
  }
  
  

  return (
    <div className="App">
              <h1 className = "Header">Weather</h1>
              <div className='Body'>{status==='success'&&<WeatherApp lat ={latitude} lon = {longitude} currentLocation = {currentLocation}/>}</div>
    </div>
  );
}

export default App;
