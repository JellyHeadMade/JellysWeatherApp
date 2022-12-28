import React, { useState } from 'react';

function TestInput() {

    const [city, setCity] = useState('');

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const handleSubmit = (e) => { 
        console.log('submitting'); 
        e.preventDefault();
        console.log(city);
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleChange} />
        <button type="submit">Submit</button>
    </form>
  );
}

export default TestInput;