import React, { useState } from 'react';
import axios from 'axios';
import WeatherResults from './weatherresults';

function AreaSelector() {

    const [area, setArea] = useState('');
    const [daycount, setDayCount] = useState(1);
    const [metric, setMetric] = useState('f');
    const [weatherdata, setWeatherData] = useState({
        forecast: null
    });
    const [dayButtonActive, setDayButtonActive] = useState({
        1: true,
        2: false,
        3: false
    });
    const [metricButtonActive, setMetricButtonActive] = useState({
        f: true,
        c: false
    });

    const [loadding, setLoadding] = useState(false);

    const dayButtonOnClick = (value) => {
        console.log(value);
        switch (value) {
            case 1:
                setDayButtonActive({ 1: true, 2: false, 3: false });
                setDayCount(1);
                break;
            case 2:
                setDayButtonActive({ 1: false, 2: true, 3: false });
                setDayCount(2);
                break;
            case 3:
                setDayButtonActive({ 1: false, 2: false, 3: true });
                setDayCount(3);
                break;
            default:
                setDayButtonActive({ 1: true, 2: false, 3: false });
                setDayCount(1);
        }
    }

    const metricButtonOnClick = (value) => {
        console.log(value);
        switch (value) {
            case 'f':
                setMetricButtonActive({ f: true, c: false });
                setMetric('f');
                break;
            case 'c':
                setMetricButtonActive({ f: false, c: true });
                setMetric('c');
                break;
            default:
                setMetricButtonActive({ f: true, c: false });
                setMetric('f');
        }
    }

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
        setLoadding(true);
         console.log(area);
         console.log(daycount);
        if (area.length > 1) {
            axios.get(`https://jellyweatherappproxyapi.herokuapp.com//forcast/${area}/${daycount}`)
            .then(function (response) {
            console.log(response.data);
            console.log(`https://jellyweatherappproxyapi.herokuapp.com//forcast/${area}/${daycount}}`)
            weatherdataupdate(response.data.forecast.forecastday);
            console.log(weatherdata.forecast);
            setLoadding(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoadding(false);
            });
        }
    }

    return (
        <form className='mainform' onSubmit={handleSubmit}>
            <h2 className='input-message'>Please input your area code to get the Weather!</h2>
            <label className='area-label'>Area</label>
            <input className='input-field' type="text" value={area} onChange={handleChange} />
            <div className='outer-button-wrapper'>
                <div className='button-selector-wrapper'>
                    {dayButtonActive[1] ? <div className='day-count-btn-1' style={{backgroundColor: '#00FF00', transition: '0.2s ease-in-out', cursor: 'default'}}>Current</div> :
                        <div className='day-count-btn-1' onClick={() => dayButtonOnClick(1)} style={{backgroundColor: '#C0C0C0', transition: '0.2s ease-in-out'}}>Current</div>}
                    {dayButtonActive[2] ? <div className='day-count-btn-2' style={{backgroundColor: '#00FF00', transition: '0.2s ease-in-out', cursor: 'default'}}>2 Days</div> :
                        <div className='day-count-btn-2' onClick={() => dayButtonOnClick(2)} style={{backgroundColor: '#C0C0C0', transition: '0.2s ease-in-out'}}>2 Days</div>}
                    {dayButtonActive[3] ? <div className='day-count-btn-3' style={{backgroundColor: '#00FF00', transition: '0.2s ease-in-out', cursor: 'default'}}>3 Days</div> :
                        <div className='day-count-btn-3' onClick={() => dayButtonOnClick(3)} style={{backgroundColor: '#C0C0C0', transition: '0.2s ease-in-out'}}>3 Days</div>}
                    {metricButtonActive['f'] ? <div className='metric-count-btn-f' style={{backgroundColor: '#00FF00', transition: '0.2s ease-in-out', cursor: 'default'}}>fahrenheit</div> :
                        <div className='metric-count-btn-f' onClick={() => metricButtonOnClick('f')} style={{backgroundColor: '#C0C0C0', transition: '0.2s ease-in-out'}}>fahrenheit</div>}
                    {metricButtonActive['c'] ? <div className='metric-count-btn-c' style={{backgroundColor: '#00FF00', transition: '0.2s ease-in-out', cursor: 'default'}}>celsius</div> :
                        <div className='metric-count-btn-c' onClick={() => metricButtonOnClick('c')} style={{backgroundColor: '#C0C0C0', transition: '0.2s ease-in-out'}}>celsius</div>}
                </div>
            </div>
            <button className='submit-btn' type="submit">Submit</button>
            {loadding ? <div className='loading-container'><div className='spinner'></div></div> : <div className='results-wrapper'>{weatherdata.forecast ? <WeatherResults metric={metric} data={weatherdata.forecast} /> : <h2 className='result-placeholder'>Please input an area code and click submit for Results!</h2>}</div>}
        </form>
    );
}

export default AreaSelector;