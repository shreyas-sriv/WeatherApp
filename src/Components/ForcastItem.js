import './forcast-items.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export const ForcastItem = ({ forcast }) => {

    const formatDate = () => {
        let date = new Date(forcast.dt * 1000)
        return date + "";
    }
    const formatTemp = () => {
        let temp = forcast.temp - 273.15;
        return temp.toFixed(2) + "°C"
    }
    return (<div>
        {/* display hourly weather data */}
        <div className={`${formatDate(forcast.dt).substring(4, 10)}`}>
            <img src={`http://openweathermap.org/img/wn/${forcast.weather[0].icon}.png`} />
            {formatDate(forcast.dt).substring(15, 21)}
            <p>{formatTemp(forcast.temp)} </p>
   
        </div>
    </div>)
}