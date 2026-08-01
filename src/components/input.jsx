import React, { useContext, useEffect } from "react";
import CityContext from "./context";

const API_KEY = "46b48f038088d19e34ae8ef5a3504426";

const Input = () => {
  const context = useContext(CityContext);

  const getWeather = async (cityName = context.name) => {
    const query = cityName.trim();

    if (!query) {
      context.setError("Please enter a city name.");
      return;
    }

    context.setLoading(true);

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            query
          )}&appid=${API_KEY}&units=metric`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            query
          )}&appid=${API_KEY}&units=metric`
        ),
      ]);

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      if (!weatherResponse.ok) {
        throw new Error(weatherData.message || "Unable to load weather data.");
      }

      if (!forecastResponse.ok) {
        throw new Error(forecastData.message || "Unable to load forecast data.");
      }

      context.handleNewCity(weatherData, forecastData);
    } catch (error) {
      context.setError(error.message);
    } finally {
      context.setLoading(false);
    }
  };

  const handleName = (event) => {
    context.setname(event.target.value);
  };

  useEffect(() => {
    getWeather("London");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="search-card" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="city-search">Search city</label>
      <div className="search-row">
        <input
          id="city-search"
          type="text"
          placeholder="London, Paris, Tokyo..."
          value={context.name}
          onChange={handleName}
        />
        <button onClick={() => getWeather()} type="submit" disabled={context.loading}>
          <i className="fa fa-search" aria-hidden="true"></i>
          <span className="sr-only">Search</span>
        </button>
      </div>
      {context.error && <p className="error-message">{context.error}</p>}
    </form>
  );
};

export default Input;
