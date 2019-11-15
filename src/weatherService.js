import React from "react";

// important timeInterval = weather | forcast
// there is no well working enum support within js
export const fetchWeather = async (
  timeInterval = "weather",
  city = "Berlin",
  country = "de"
) => {
  var data= {};
  let url = `https://api.openweathermap.org/data/2.5/${timeInterval}?q=${city},${country}&units=metric&APPID=6240fddc432b92c35bc8bb8329965173`;

  // "5days"
  //   "https://api.openweathermap.org/data/2.5/forecast?q=Berlin,de&APPID=6240fddc432b92c35bc8bb8329965173";
  // "now"
  //   "https://api.openweathermap.org/data/2.5/weather?q=Berlin,de&APPID=6240fddc432b92c35bc8bb8329965173";
  return await fetch(url)
  .then(response => {
    return response.json();
  })
  .catch(err => {
    console.log(err);
  });
};

export const speedInMeterProHour = speed => {
  return (speed * 3.69).toFixed(2) + " km/h";
};

export const WeatherIcon = ({ iconId }) => {
  return (
    <img src={`http://openweathermap.org/img/wn/${iconId}.png`} alt="iconId" />
  );
};
