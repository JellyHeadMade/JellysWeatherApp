import React, { useState } from 'react';

function WeatherResults(props) {

    const [flip, setFlip] = useState({
        0: false,
        1: false,
        2: false,
    });    

    const flipped = (index) => {
        if (flip[index] === false) {
            setFlip({ ...flip, [index]: true });
        } else {
            setFlip({ ...flip, [index]: false });
        }
    }

    const rangecheck = (value) => {
        if (Math.round(value) >= -100 && Math.round(value) <= 32) {
            return {backgroundImage: "linear-gradient(to bottom left, rgb(110, 161, 104) 10%, rgb(77, 74, 230) 115%)" };
        }
        if (Math.round(value) >= 33 && Math.round(value) <= 77) {
            return {backgroundImage: "linear-gradient(to bottom left, rgb(221, 197, 90) 1%, rgb(69, 165, 160) 115%)" };
        }
        if (Math.round(value) >= 78 && Math.round(value) <= 150) {
            return {backgroundImage: "linear-gradient(to bottom left, rgb(231, 102, 102) 10%, rgb(229, 231, 87) 115%)" };
        }
    }

    const randomString = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        var i;
        for (i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
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
                        <div className='weather-card-text__date' key={`${randomString(16)}_date`}>{ForcastDay.date}</div>
                        <div className='weather-card-text__temp' key={`${randomString(16)}_temp`}>Average Tempature for the day is {props.metric === 'f' ? ForcastDay.day.avgtemp_f : ForcastDay.day.avgtemp_c}</div>
                        <div className='weather-card-text__condition' key={`${randomString(16)}_condition`}>The Condition for the day is {ForcastDay.day.condition.text}</div>
                        <div className='weather-card-text__rain' key={`${randomString(16)}_rain`}>Chance of rain is {ForcastDay.day.daily_will_it_rain}</div>
                        <div className='weather-card-text__high' key={`${randomString(16)}_high`}>High tempature for the day is {props.metric === 'f' ? ForcastDay.day.maxtemp_f : ForcastDay.day.maxtemp_c}</div>
                        <div className='weather-card-text__low' key={`${randomString(16)}_low`}>Low tempature for the day is {props.metric === 'f' ? ForcastDay.day.mintemp_f : ForcastDay.day.mintemp_c}</div>
                        <div className='weather-card-text__humidity' key={`${randomString(16)}_humidity`}>Humidity for the day : {ForcastDay.day.avghumidity}</div>
                    </div>
                </div>
            )
        })}</div>
        </div>
    );
}

export default WeatherResults;