import React from 'react';

import AreaSelector from './SubComponents/areaselector';
import WeatherResults from './SubComponents/weatherresults';

function MainPage() {
  return (
    <div>
      <h1>Welcome to the Jelly Weather app. the wrost you will ever use!</h1>
      <AreaSelector />
      <WeatherResults />
    </div>
  );
}

export default MainPage;