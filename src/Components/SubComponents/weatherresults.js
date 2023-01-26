import React from 'react';

function WeatherResults(props) {
    return (
        <div>
        <h1>Weather Results</h1>
        <div className="current-temp">current temp is {props.metric === 'f' ? props.data[0].day.avgtemp_f : props.data[0].day.avgtemp_c}F</div>
        <div className='weather-card-wrapper'>{props.data.map((ForcastDay, index) => {
            return (
                <div className='weatherresult-card'>
                    <div className='card-bg'>
                        <div className='weather-card-text__date' key={index}>{ForcastDay.date}</div>
                        <div className='weather-card-text' key={index}>Average Tempature for the day is {props.metric === 'f' ? ForcastDay.day.avgtemp_f : ForcastDay.day.avgtemp_c}</div>
                        <div className='weather-card-text' key={index}>The Condition for the day is {ForcastDay.day.condition.text}</div>
                        <div className='weather-card-text' key={index}>Chance of rain is {ForcastDay.day.daily_will_it_rain}</div>
                        <div className='weather-card-text' key={index}>High tempature for the day is {props.metric === 'f' ? ForcastDay.day.maxtemp_f : ForcastDay.day.maxtemp_c}</div>
                        <div className='weather-card-text' key={index}>Low tempature for the day is {props.metric === 'f' ? ForcastDay.day.mintemp_f : ForcastDay.day.mintemp_c}</div>
                        <div className='weather-card-text' key={index}>Humidity for the day : {ForcastDay.day.avghumidity}</div>
                    </div>
                </div>
            )
        })}</div>
        </div>
    );
}

export default WeatherResults;