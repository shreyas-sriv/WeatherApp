
import { ForcastItemDaily } from "./ForcastItemDaily";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'


export const Forecast = (weatherData) => {

    const [view, setView] = useState('daily');

    //update button text

    const updateView = () => {
        if (view === 'daily') {
            setView('hourly')
        } else {
            setView('daily')
        }
    }

    return (<div>
        <button type="button" onClick={() => updateView()} className="btn btn-light mb-1">
            {view === 'daily' ? 'Show Hourly Data' : 'Show Daily Data'}</button>
        <div className="forcast-item " >{weatherData.info.map((forcast, index) => {
            return <ForcastItemDaily key={index} forcast={forcast} view={view} />
        })}</div>
        <br></br>
    </div>)
}