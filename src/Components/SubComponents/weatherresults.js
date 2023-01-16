import React from 'react';

function WeatherResults(props) {
    return (
        <div>
        <h1>Weather Results {console.log(props.data[0])}</h1>
        <div className="current-temp">current temp is {props.data[0].day.avgtemp_f}F</div>
        <div>{props.data.map((ForcastDay, index) => {
            return (
                <div>
                    <div key={ForcastDay.date}>{ForcastDay.date}</div>
                    <div key={ForcastDay.date}>Average Tempature for the day is {props.metric === 'f' ? ForcastDay.day.avgtemp_f : ForcastDay.day.avgtemp_c}</div>
                    <div key={ForcastDay.date}>The Condition for the day is {ForcastDay.day.condition.text}</div>
                    <div key={ForcastDay.date}>Chance of rain is {ForcastDay.day.daily_will_it_rain}</div>
                    <div key={ForcastDay.date}>High tempature for the day is {props.metric === 'f' ? ForcastDay.day.maxtemp_f : ForcastDay.day.maxtemp_c}</div>
                    <div key={ForcastDay.date}>Low tempature for the day is {props.metric === 'f' ? ForcastDay.day.mintemp_f : ForcastDay.day.mintemp_c}</div>
                    <div key={ForcastDay.date}>Humidity for the day : {ForcastDay.day.avghumidity}</div>
                </div>
            )
        })}</div>
        </div>
    );
}

export default WeatherResults;