import React, { useState } from 'react';
import axios from 'axios';

function TestInput() {

    const [city, setCity] = useState('');

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const handleSubmit = (e) => { 
        console.log('submitting'); 
        e.preventDefault();
        console.log(city);
        if (city.length > 1) {
            axios.get(`https://scjournalapiv2.herokuapp.com/forcast/${city}`)
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