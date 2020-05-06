import React from "react";

function Weather({
  city,
  temperature,
  description,
  country,
  humidity,
  wind_speed,
  hour,
  minute,
  a,
  day,
  icon,
}) {
  return (
    <div>
      <div className="left">
        <p>
          {city},{country}
        </p>
        <div className="img-temp">
          <img
            src={"https://www.weatherbit.io/static/img/icons/" + icon + ".png"}
            alt=""
          />
          <p>
            <span className="temp">{temperature}</span>
            <span className="degree"> °C</span>
          </p>
        </div>
      </div>
      <div className="right">
        <p className="time">
          {hour}:{minute} {a}
        </p>
        <p>{description}</p>
        <p>Humidity:{humidity}%</p>
        <p>Wind:{wind_speed} mph</p>
      </div>
    </div>
  );
}

export default Weather;
