import React,{useState, useEffect} from 'react';
import axios from 'axios';
import MapLocation from './MapLocation';
import {Forecast } from './Forecast';
import ControlledTabs from './TabbedComponent';

export const WeatherApp = ({lon,lat,currentLocation}) => {
    const weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?"
    const weatherKey = "13afaed8e871c6b774849256e0c3a9dd";
    const [weatherData, setWeatherData] = useState([]);
    const [currentTemp,setCurrentTemp] = useState({});
    
    //convert date from unix to string

    const formatDate = (obj) => {
        let date = new Date(obj * 1000)
        return date + "";
    }

    //get date required format 

    const getDate = (date) =>{ 
        return date.substring(4, 10)
    }

    // transform data, adding date in required format

    const tranformDate = (data) => {
        let newDateObj = {};
        let daily = data.daily;
        let hourly = data.hourly;

        let formatedDate = daily.map(function(el){
            if(el.dt) {
              let formate_date_time = formatDate(el.dt);
              let formate_date_name = getDate(formate_date_time);
              el['date'] = formate_date_name; 
              return el;
            }
        });

        let formatedDateHourly = hourly.map(function(el){
            if(el.dt) {
              let formate_date_time = formatDate(el.dt);
              let formate_date_name = getDate(formate_date_time);
              el['date'] = formate_date_name; 
              return el;
            }
        })

        let formatedDateWithHour = daily.map(function (el) {
            if (el.dt) {
                let date = el.date;
                let hourlyFilter = formatedDateHourly.filter(function (elh) {
                    if (elh.dt) {
                        if (elh['date'] === date)
                        return elh;
                    }
                })
                el['hourly'] = hourlyFilter
                return el

            }
        });

        return formatedDateWithHour;
    }

    //fetch weather data
    useEffect(async () => {
        let response = await axios(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${weatherKey}`);
        let trans_data = tranformDate(response.data);
        setWeatherData(trans_data);
        setCurrentTemp(response.data);

    }, []);

    let weatherTab = <div>
                {
            weatherData.length !== 0 ? <Forecast info = {weatherData}  />
            : <div>Still loading data</div>
        }
    </div>

    let mapTab = <div>
        { Object.keys(currentTemp).length !== 0 ? < MapLocation currentLocation = {currentLocation} lat = {lat} lon = {lon} weatherData = {currentTemp}/> : 'loading data'}
    </div>

    return (<div>
        
        <ControlledTabs tab1 = {mapTab} tab2 = {weatherTab}/>
    </div>
    )
    
}