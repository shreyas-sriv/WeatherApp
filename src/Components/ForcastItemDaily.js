import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './forcastdaily.css';
import { ForcastItem } from "./ForcastItem";
export const ForcastItemDaily = ({ forcast , view}) => {


    const formatDate = () => {
        let date = new Date(forcast.dt * 1000)
        return date + "";
    }

    return (

    //   display daily weather data 

    <div className='me-2 ms-2 mt-2 mb-2 shadow-lg' >
        {
            view === 'daily' ?
                <Card style={{ width: '100%'  }}>
                    <Card.Body>
                        <Card.Title>{formatDate(forcast.dt).substring(0, 4)}</Card.Title>
                        <Card.Text>
                            <img src={`http://openweathermap.org/img/wn/${forcast.weather[0].icon}.png`} />
                            <p>{formatDate(forcast.dt).substring(4, 10)} </p>
                            <p>H: {(forcast.temp.max - 273.15).toFixed(2) + "°C"} </p>
                            <p>L: {(forcast.temp.min - 273.15).toFixed(2) + "°C"} </p>
                        </Card.Text>
                    </Card.Body>
                </Card>

                :  
                <Card style={{ width: '100%' }}>
                    <div className='outer-container' style={{ width: '300px' }}>
                    <Card.Title>{formatDate(forcast.dt).substring(0, 4)}</Card.Title>
                        <div className='inner-container' style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <>{forcast.hourly.length == 0 ? <div className='cardTitle'>
                                <Card.Title className = "ms-4">No Hourly data Available</Card.Title>
                                </div>
                            
                            :forcast.hourly.map((forcast, index) => {
                                return <ForcastItem key={index} forcast={forcast} />
                            })}</>

                        </div>
                    </div>
                </Card>

        }
    </div>)

}