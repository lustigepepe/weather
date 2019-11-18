import React from "react";
import "./app.css";
import CurrentWeather from "./currentWeather";
import ForecastWeather from "./forecastWeather";

const App = _ => {
  return (
    <div className="app">
      <CurrentWeather />
      <ForecastWeather />
    </div>
  );
};

export default App;