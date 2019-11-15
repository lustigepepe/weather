import React, { useState, useEffect } from "react";
import "./app.css";
import DayForecast from "./dayForecast";

import {
  fetchWeather,
  speedInMeterProHour
} from "./weatherService";

const CurrentWeather = () => {
  const [now, setNow] = useState({});

  // very simple no subscription just pull one time all data,
  useEffect(() => {
    let nowW = fetchWeather("weather", "Berlin", "de");
    nowW.then(data => {
      let now = {};
      now.speed = data.wind.speed;
      now.temp = data.main.temp;
      now.weather = data.weather[0].main;
      now.city = data.name;
      setNow(now);
    });
   
  }, []);
  return (
    <div>
      <div className="currentW">
        <header>
          <div className="currentW_city">{now.city}</div>
        </header>
        <div>{now.weather}</div>
        <div>Wind: {speedInMeterProHour(now.speed)}</div>
        <div className="currentW_temp">{now.temp}&deg;</div>
      </div>
      <DayForecast />
    </div>
  );
};

export default CurrentWeather;
