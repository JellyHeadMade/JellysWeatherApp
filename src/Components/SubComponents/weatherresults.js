import React from 'react';

function WeatherResults(props) {
    return (
        <div>
        <h1>Weather Results</h1>
        <div className="current-temp">current temp is {props.metric == 'f' ? props.data[0].day.avgtemp_f : props.data[0].day.avgtemp_c}F</div>
        <div className='weather-card-wrapper'>{props.data.map((ForcastDay, index) => {
            return (
                <div className='weather-report-day-wrapper'>
                    <div className='weather-report-bg'>
                        <div className='weather-report-text__date' key={index}>{ForcastDay.date}</div>
                        <div className='weather-report-text__avg-temp' key={index}>Average Tempature for the day is {props.metric === 'f' ? ForcastDay.day.avgtemp_f : ForcastDay.day.avgtemp_c}</div>
                        <div className='weather-report-text__condition' key={index}>The Condition for the day is {ForcastDay.day.condition.text}</div>
                        <div className='weather-report-text__rain' key={index}>Chance of rain is {ForcastDay.day.daily_will_it_rain}</div>
                        <div className='weather-report-text__high-temp' key={index}>High tempature for the day is {props.metric === 'f' ? ForcastDay.day.maxtemp_f : ForcastDay.day.maxtemp_c}</div>
                        <div className='weather-report-text__low-temp' key={index}>Low tempature for the day is {props.metric === 'f' ? ForcastDay.day.mintemp_f : ForcastDay.day.mintemp_c}</div>
                        <div className='weather-report-text__humidity' key={index}>Humidity for the day : {ForcastDay.day.avghumidity}</div>
                    </div>
                </div>
            )
        })}</div>
        </div>
    );
}

export default WeatherResults;