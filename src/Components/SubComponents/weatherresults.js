import React, { useState } from 'react';

function WeatherResults(props) {

    const [flip, setFlip] = useState({
        0: false,
        1: false,
        2: false,
    });    

    const flipped = (index) => {
        console.log('trying to flip' + index);
        if (flip[index] === false) {
            setFlip({ ...flip, [index]: true });
        } else {
            setFlip({ ...flip, [index]: false });
        }
    }

    const rangecheck = (value) => {
        console.log('rangecheck hit!!!!!');
        console.log(value);
        if (value >= -100 && value <= 32) {
            return {backgroundImage: "linear-gradient(to bottom left, rgb(110, 161, 104) 10%, rgb(77, 74, 230) 115%)" };
        }
        if (value >= 33 && value <= 67) {
            return {backgroundImage: "linear-gradient(to bottom left, rgb(221, 197, 90) 1%, rgb(69, 165, 160) 115%)" };
        }
        if (value >= 68 && value <= 150) {
            return {backgroundImage: "linear-gradient(to bottom left, rgb(231, 102, 102) 10%, rgb(229, 231, 87) 115%)" };
        }
    }
    return (
        <div>
        <h1>Weather Results</h1>
        <div className="current-temp-title">current temp
            <div className='current-temp'>{props.metric === 'f' ? props.data[0].day.avgtemp_f : props.data[0].day.avgtemp_c}{props.metric === 'f' ? 'F' : 'C'}</div>
        </div>
        <div className='weather-card-wrapper'>{props.data.map((ForcastDay, index) => {
            return (
                <div onClick={() => flipped(index)} className={flip[index] ? `weather-card-inner-${index}-isflipped` : `weather-card-inner-${index}`}>
                    <div className='card__face weather-card-front'>{ForcastDay.date}</div>
                    <div className='card__face weather-card-back' style={rangecheck(ForcastDay.day.avgtemp_f)}>
                        <div className='weather-card-text__date' key={index}>{ForcastDay.date}</div>
                        <div className='weather-card-text__temp' key={index}>Average Tempature for the day is {props.metric === 'f' ? ForcastDay.day.avgtemp_f : ForcastDay.day.avgtemp_c}</div>
                        <div className='weather-card-text__condition' key={index}>The Condition for the day is {ForcastDay.day.condition.text}</div>
                        <div className='weather-card-text__rain' key={index}>Chance of rain is {ForcastDay.day.daily_will_it_rain}</div>
                        <div className='weather-card-text__high' key={index}>High tempature for the day is {props.metric === 'f' ? ForcastDay.day.maxtemp_f : ForcastDay.day.maxtemp_c}</div>
                        <div className='weather-card-text__low' key={index}>Low tempature for the day is {props.metric === 'f' ? ForcastDay.day.mintemp_f : ForcastDay.day.mintemp_c}</div>
                        <div className='weather-card-text__humidity' key={index}>Humidity for the day : {ForcastDay.day.avghumidity}</div>
                    </div>
                </div>
            )
        })}</div>
        </div>
    );
}

export default WeatherResults;