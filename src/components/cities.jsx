import React, { Fragment, useContext } from "react";
import CityContext from "./context";
import Input from "./input";

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

const getWeatherIcon = (icon) =>
  icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "";

const groupDailyForecast = (forecastList = []) => {
  const grouped = forecastList.reduce((days, item) => {
    const dateKey = item.dt_txt.split(" ")[0];
    const existingDay = days[dateKey] || {
      date: new Date(item.dt * 1000),
      min: item.main.temp_min,
      max: item.main.temp_max,
      noon: item,
    };

    existingDay.min = Math.min(existingDay.min, item.main.temp_min);
    existingDay.max = Math.max(existingDay.max, item.main.temp_max);

    if (item.dt_txt.includes("12:00:00")) {
      existingDay.noon = item;
    }

    return { ...days, [dateKey]: existingDay };
  }, {});

  return Object.values(grouped).slice(0, 5);
};

const City = () => {
  const { city } = useContext(CityContext);

  if (loading && !city) {
    return (
      <section className="weather-card loading-card">
        <Input />
        <div>Loading weather...</div>
      </section>
    );
  }

  if (!city || !city.weather) {
    return (
      <section className="weather-card">
        <Input />
      </section>
    );
  }

  const currentWeather = city.weather[0];
  const hourlyForecast = forecast?.list?.slice(0, 6) || [];
  const dailyForecast = groupDailyForecast(forecast?.list);
  const currentDate = new Date((city.dt + city.timezone) * 1000);
  const feelsLike = Math.round(city.main.feels_like);
  const temperature = Math.round(city.main.temp);
  const windSpeed = Math.round(city.wind.speed * 3.6);

  return (
    <section className="weather-card" aria-label={`Weather for ${city.name}`}>
      <div className="card-overlay">
      <Input />
        <header className="card-header">
          <div className="location">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            <span>
              {city.name}, {city.sys.country}
            </span>
          </div>
        </header>

        <p className="date-line">
          {dayFormatter.format(currentDate)} · {timeFormatter.format(currentDate)}
        </p>

        <div className="hero-weather">
          <div>
            <h2>{temperature}°</h2>
            <p className="condition">{currentWeather.description}</p>
            <p className="feels-like">Feels like {feelsLike}°</p>
          </div>
          <img
            src={getWeatherIcon(currentWeather.icon)}
            alt={currentWeather.description}
            className="weather-icon-large"
          />
        </div>

        <div style={flex}>
          <h2>
            {Math.round(city.main.temp - 273.15)} <sup>°C</sup>
          </h2>
          <span>{city.weather[0].description}</span>
        </div>
      </div>
    </Fragment>
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default City;