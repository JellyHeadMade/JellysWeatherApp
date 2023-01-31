import React, { useState } from 'react';
import axios from 'axios';
import WeatherResults from './weatherresults';

function AreaSelector() {

    const [area, setArea] = useState('');
    const [daycount, setDayCount] = useState(0);
    const [metric, setMetric] = useState('f');
    const [weatherdata, setWeatherData] = useState({
        forecast: null
    });

    const handleChange = (e) => {
        setArea(e.target.value);
    }

    const weatherdataupdate = (data) => {
        setWeatherData(() => ({
            forecast: data
        }))
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
         console.log(area);
         console.log(daycount);
        if (area.length > 1) {
            axios.get(`https://jellyweatherappproxyapi.herokuapp.com//forcast/${area}/${daycount}`)
            .then(function (response) {
            console.log(response.data);
            console.log(`https://jellyweatherappproxyapi.herokuapp.com//forcast/${area}/${daycount}}`)
            weatherdataupdate(response.data.forecast.forecastday);
            console.log(weatherdata.forecast);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <form className='mainform' onSubmit={handleSubmit}>
            <h2 className='input-message'>Please input your area code to get the Weather!</h2>
            <label className='area-label'>Area</label>
            <input className='input-field' type="text" value={area} onChange={handleChange} />
            <div className='day-count-btn-1' onClick={() => setDayCount(1)}>Current</div>
            <div className='day-count-btn-2' onClick={() => setDayCount(2)}>2 Days</div>
            <div className='day-count-btn-3' onClick={() => setDayCount(3)}>3 Days</div>
            <div className='metric-count-btn-f' onClick={() => setMetric('f')}>Fehrinheight</div>
            <div className='metric-count-btn-c' onClick={() => setMetric('c')}>celcius</div>
            <button className='submit-btn' type="submit">Submit</button>
            {weatherdata.forecast ? <WeatherResults metric={metric} data={weatherdata.forecast} /> : <h2 className='result-placeholder'>Please input an area code and click submit for Results!</h2>}
        </form>
    );
}

export default AreaSelector;