import React from 'react';

function WeatherResults(props) {
    return (
        <div>
        <h1>Weather Results {console.log(props.data[0])}</h1>
        <div className="weather-results">current temp is {props.data[0].day.avgtemp_f}F</div>
        </div>
    );
}

export default WeatherResults;