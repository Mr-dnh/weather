import React, { useContext } from "react";
import CityContext from "./context";

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
  const { city, forecast, loading } = useContext(CityContext);

  if (loading && !city) {
    return <div className="weather-card loading-card">Loading weather...</div>;
  }

  if (!city || !city.weather) {
    return null;
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
        <header className="card-header">
          <div className="location">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            <span>
              {city.name}, {city.sys.country}
            </span>
          </div>
          <i className="fa fa-bars" aria-hidden="true"></i>
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

        <div className="metric-grid">
          <article>
            <i className="fa fa-tint" aria-hidden="true"></i>
            <span>Humidity</span>
            <strong>{city.main.humidity}%</strong>
          </article>
          <article>
            <i className="fa fa-leaf" aria-hidden="true"></i>
            <span>Wind</span>
            <strong>{windSpeed} km/h</strong>
          </article>
          <article>
            <i className="fa fa-sun-o" aria-hidden="true"></i>
            <span>Pressure</span>
            <strong>{city.main.pressure} hPa</strong>
          </article>
        </div>

        <div className="forecast-strip">
          {hourlyForecast.map((item, index) => (
            <article key={item.dt}>
              <span>{index === 0 ? "Now" : timeFormatter.format(new Date(item.dt * 1000))}</span>
              <img src={getWeatherIcon(item.weather[0].icon)} alt="" />
              <strong>{Math.round(item.main.temp)}°</strong>
            </article>
          ))}
        </div>

        <div className="daily-forecast">
          <h3>5-Day Forecast</h3>
          {dailyForecast.map((day) => (
            <article key={day.date.toISOString()}>
              <span>{dayFormatter.format(day.date)}</span>
              <img src={getWeatherIcon(day.noon.weather[0].icon)} alt="" />
              <span>{day.noon.weather[0].main}</span>
              <strong>
                {Math.round(day.max)}° <small>{Math.round(day.min)}°</small>
              </strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default City;
