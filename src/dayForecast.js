import React, { useState, useEffect } from "react";
import "./app.css";
import {
  fetchWeather,
  WeatherIcon,
  speedInMeterProHour
} from "./weatherService";

const DayForecast = _ => {
  const [detail, setDetail] = useState([]);

  // very simple no subscription just pull one time all data,
  useEffect(() => {
    let forecastW = fetchWeather("forecast", "Berlin", "de");
    forecastW.then(data => {
      var arr = [];

      for (var i = 0; i < 5; i++) {
        var _temp = data.list[i];
        let st = _temp.dt_txt.split(" ");
        st = st[1].split(":");

        let ob = {
          time: st[0] + ":" + st[1],
          temp: _temp.main.temp,
          icon: _temp.weather[0].icon,
          wind: _temp.wind.speed
        };
        arr.push(ob);
        setDetail(arr);
      }
    });
  }, []);
  return (
    <div className="dayForecast">
      <div className="dayForecast_detail">
        <div className="dayForecast_detail_content">
          {detail.map((data, index) => {
            return (
              <div key={index} className="dayForecast_detail_content_item">
                <div>{data.time}</div>
                <WeatherIcon iconId={data.icon} />
                <div className="dayForecast_wind">Wind: {speedInMeterProHour(data.wind)}</div>
                <div className="dayForecast_temp">{data.temp}&nbsp;&deg;</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayForecast;
