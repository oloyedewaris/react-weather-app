import React, { useState } from "react";
import style from "./App.module.css";

const api = {
  key: "bf96fbc38fea2ad0fbdcb49eefa1ad6f",
  url: `https://api.openweathermap.org/data/2.5/`,
};

const Weather = (props) => {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});

  const onButtonClick = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.url}weather?q=${input}&unit=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          setInput("");
        })
        .catch((err) => console.log(err));
    }
  };

  const onSearch = (e) => {
    setInput(e.target.value);
  };

  const dateHandler = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div>
      <h2>Waris Weather App</h2>
      <main>
        <div
          className={
            typeof weather.main !== "undefined"
              ? weather.main.temp > 290
                ? style.appWarm
                : style.appCold
              : style.appCold
          }
        >
          <div className={style.searchBox}>
            <input
              type="text"
              className={style.searchBar}
              placeholder="Search city..."
              onChange={onSearch}
              value={input}
              onKeyPress={onButtonClick}
            />
          </div>
          {typeof weather.main !== "undefined" ? (
            <div>
              <div className={style.locationBox}>
                <div className={style.location}>
                  {weather.name}, {weather.sys.country}
                </div>
                <div className={style.date}>{dateHandler(new Date())}</div>
              </div>
              <div className={style.weatherBox}>
                <div className={style.temp}>
                  {Math.round(weather.main.temp - 270)}
                  <sup>o</sup>C
                </div>
                <div className={style.weather}>{weather.weather[0].main}</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    </div>
  );
};

export default Weather;
