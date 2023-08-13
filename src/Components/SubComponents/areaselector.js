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

    const buttonStyle = [
        { backgroundColor: '#36C2A4', transition: '0.2s ease-in-out', cursor: 'default', color: '#121212' },
        { backgroundColor: '#242424', transition: '0.2s ease-in-out' }
    ]

    const ButtonOnClick = (value) => {
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
            case 'f':
                setMetricButtonActive({ f: true, c: false });
                setMetric('f');
                break;
            case 'c':
                setMetricButtonActive({ f: false, c: true });
                setMetric('c');
                break;
            default:
                setDayButtonActive({ 1: true, 2: false, 3: false });
                setDayCount(1);
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
        if (area.length > 1) {
            axios.get(`https://jellyweatherappproxyapi.herokuapp.com//forcast/${area}/${daycount}`)
            .then(function (response) {
            weatherdataupdate(response.data.forecast.forecastday);
            setLoadding(false);
            })
            .catch(function (error) {
                console.log(error);
                alert('Please input a valid Zip Code');
                setLoadding(false);
            });
        }
    }

    return (
        <form className='mainform' onSubmit={handleSubmit}>
            <h2 className='input-message'>Please input your area code to get the Weather!</h2>
            <label className='area-label'>Zip Code</label>
            <input className='input-field' type="text" 
                placeholder='Zip Code'
                value={area}
                onChange={handleChange}
                pattern='[\d]{5}'
                maxLength={5} />
            <div className='outer-button-wrapper'>
                <div className='button-selector-wrapper'>
                    {dayButtonActive[1] ? <div className='day-count-btn-1' style={buttonStyle[0]}>Current</div> :
                        <div className='day-count-btn-1' onClick={() => ButtonOnClick(1)} style={buttonStyle[1]}>Current</div>}
                    {dayButtonActive[2] ? <div className='day-count-btn-2' style={buttonStyle[0]}>2 Days</div> :
                        <div className='day-count-btn-2' onClick={() => ButtonOnClick(2)} style={buttonStyle[1]}>2 Days</div>}
                    {dayButtonActive[3] ? <div className='day-count-btn-3' style={buttonStyle[0]}>3 Days</div> :
                        <div className='day-count-btn-3' onClick={() => ButtonOnClick(3)} style={buttonStyle[1]}>3 Days</div>}
                    {metricButtonActive['f'] ? <div className='metric-count-btn-f' style={buttonStyle[0]}>fahrenheit</div> :
                        <div className='metric-count-btn-f' onClick={() => ButtonOnClick('f')} style={buttonStyle[1]}>fahrenheit</div>}
                    {metricButtonActive['c'] ? <div className='metric-count-btn-c' style={buttonStyle[0]}>celsius</div> :
                        <div className='metric-count-btn-c' onClick={() => ButtonOnClick('c')} style={buttonStyle[1]}>celsius</div>}
                </div>
            </div>
            <button className='submit-btn1' type="submit">Submit</button>
            {loadding ? <div className='loading-container'><div className='spinner'></div></div> : <div className='results-wrapper'>{weatherdata.forecast ? <WeatherResults metric={metric} data={weatherdata.forecast} /> : <h2 className='result-placeholder'>Please input an area code and click submit for Results!</h2>}</div>}
        </form>
    );
}

export default AreaSelector;