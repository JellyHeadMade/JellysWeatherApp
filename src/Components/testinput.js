import React, { useState, useEffect } from 'react';
import axios from 'axios';

var apiKey = '';

function TestInput() {

    useEffect(() => {
        axios.get('https://scjournalapiv2.herokuapp.com/')
        .then(function (res) {
            apiKey = res.data.key;
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    const [city, setCity] = useState('');

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const handleSubmit = (e) => { 
        console.log('submitting'); 
        e.preventDefault();
        console.log(city);
        console.log(apiKey);
        if (city.length > 10) {
            axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)
            .then(function (response) {
            console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleChange} />
        <button type="submit">Submit</button>
    </form>
  );
}

export default TestInput;