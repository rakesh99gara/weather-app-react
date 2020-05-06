import React, { useState } from "react";
import "./App.css";
import Form from "./Form";
import Weather from "./Weather";
import Report from "./Report";

const APIKEY = "db8d27e7c22e4d7085e9b2aa85f04f6a";

function App() {
  const [weather, setWeather] = useState([]);

  const [reports, setReports] = useState([]);
  let weekday = new Array(7);
  weekday[0] = "SUN";
  weekday[1] = "MON";
  weekday[2] = "TUE";
  weekday[3] = "WED";
  weekday[4] = "THU";
  weekday[5] = "FRI";
  weekday[6] = "SAT";

  async function fetchData(e) {
    e.preventDefault();
    setReports([]);
    const city = e.target.elements.city.value;

    const apiData = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=${APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => data);

    const d = new Date();
    console.log(d.toTimeString());
    var hour = d.getHours();
    let a;
    if (hour > 12) {
      a = "PM";
      hour -= 12;
    } else {
      a = "AM";
    }
    var minute = d.getMinutes();
    if (minute < 9) {
      minute = "0" + minute;
    }
    const day = d.getDay();

    console.log(apiData);

    setWeather({
      data: apiData,
      city: apiData.data[0].city_name,
      country: apiData.data[0].country_code,
      temperature: apiData.data[0].temp,
      description: apiData.data[0].weather.description,
      icon: apiData.data[0].weather.icon,
      humidity: apiData.data[0].rh,
      wind_speed: parseFloat(apiData.data[0].wind_spd * 2.236936).toFixed(2),
      hour: hour,
      minute: minute,
      a: a,
      day: weekday[day],
      error: "",
    });

    const dayData = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => data);

    const addReports = (i) => {
      setReports((reports) => [
        ...reports,
        {
          id: i,
          max: dayData.data[i].app_max_temp,
          min: dayData.data[i].app_min_temp,
          day: weekday[(day + i) % 7],
        },
      ]);
    };

    var i;
    for (i = 0; i < 5; i++) {
      addReports(i + 1);
    }
  }

  return (
    <div className="App">
      <h3>Weather apps</h3>
      <Form getWeather={fetchData} />
      <div className="weather">
        <Weather
          city={weather.city}
          country={weather.country}
          temperature={weather.temperature}
          description={weather.description}
          error={weather.description}
          humidity={weather.humidity}
          wind_speed={weather.wind_speed}
          hour={weather.hour}
          minute={weather.minute}
          a={weather.a}
          day={weather.day}
          icon={weather.icon}
        />
      </div>
      <div className="reports">
        {reports.map((report) => (
          <Report
            key={report.id}
            day={report.day}
            min={report.min}
            max={report.max}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
