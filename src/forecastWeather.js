import React, { useState, useEffect } from "react";
import "./app.css";
import {
  fetchWeather,
  WeatherIcon,
  speedInMeterProHour
} from "./weatherService";
const ForecastWeather = () => {
  const [forecast, setForecast] = useState([]);

  // very simple, no subscription just pull one time all data,
  useEffect(() => {
    let forecastW = fetchWeather("forecast", "Berlin", "de");
    forecastW.then(data => {
      var arr = [];
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

      var day = new Date();
      var nextDay = new Date(day);
      let j = 0;
      for (var i = 1; i < 4; i++) {
        nextDay.setDate(day.getDate() + i);
        let month = nextDay.getMonth() + 1;
        var nextDayFormatted =
          nextDay.getFullYear() + "-" + month + "-" + nextDay.getDate();

        for (j; j < data.list.length; j++) {
          var nextSt = data.list[j].dt_txt.split(" ");

          if (nextSt[0] === nextDayFormatted) {
            var _day = data.list[j + 4];
            var _night = data.list[j + 7];
            let st = _day.dt_txt.split(" ");
            var d = new Date(st[0]);
            var dayName = days[d.getDay()];

            let ob = {
              day: dayName,
              icon: _day.weather[0].icon,
              windDay: _day.wind.speed,
              tempDay: _day.main.temp,
              tempNight: _night.main.temp
            };
            arr.push(ob);
            j += 7;
            break;
          }
        }
      }
      console.log(arr);
      setForecast(arr);
    });
  }, []);

  return (
    <div>
      <div className="forecast">
        <div className="forecast_content">
          {forecast.map((data, index) => {
            return (
              <div key={index} className="forecast_item">
                <div className="forecast_day">{data.day}</div>
                <WeatherIcon className="forecast_icon" iconId={data.icon} />
                <div className="forecast_wind">
                  Wind on Day: {speedInMeterProHour(data.windDay)}
                </div>
                <div className="forecast_tempDay">{data.tempDay}</div>
                <div className="forecast_tempNight">{data.tempNight}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ForecastWeather;
