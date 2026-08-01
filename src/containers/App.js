import React, { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import City from "../components/cities";
import CityContext from "../components/context";
import Input from "../components/input";
import About from "../components/about";

const App = () => {
  const [city, setCity] = useState();
  const [forecast, setForecast] = useState();
  const [name, setname] = useState("London");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewCity = (weatherData, forecastData) => {
    setCity(weatherData);
    setForecast(forecastData);
    setError("");
  };

  return (
    <CityContext.Provider
      value={{
        city,
        forecast,
        handleNewCity,
        setname,
        name,
        error,
        setError,
        loading,
        setLoading,
      }}
    >
      <div className="app-shell">
        <nav className="nav">
          <NavLink to="/">Weather</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route
            path="/"
            element={
              <main className="weather-page">
                <section className="intro-card" aria-label="Design inspiration">
                  <span className="intro-number">4.</span>
                  <div>
                    <h1>Nature Inspired</h1>
                    <p>Beautiful imagery and soft overlays for a natural feel.</p>
                  </div>
                </section>
                <Input />
                <City />
              </main>
            }
          />
        </Routes>
      </div>
    </CityContext.Provider>
  );
};

export default App;
