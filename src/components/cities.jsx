import React, { Fragment, useContext } from "react";
import CityContext from "./context";

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const hour = () => {
  const hour = date.getHours();
  if (hour < 10) {
    return "0" + hour;
  } else return hour;
};
const minute = () => {
  const min = date.getMinutes();
  if (min < 10) {
    return "0" + min;
  } else return min;
};

const City = () => {
  const { city } = useContext(CityContext);

  const container = {
    background: "rgba(104 123 137 / 18%)",
    backdropFilter: "blur(5px)",
    color: "white",
    position: "fixed",
    width: "90%",
    bottom: "1em",
    borderRadius: "20px",
    padding: "10px",
    margin: "0 5%",
    fontSize: "1.5em",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const flex = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const sky = {
    display: 'flex',
    margin: 'auto',
    width: '35vw',
    maxWidth: '390px',
  }

  try {
    return (
      <Fragment>
        <img style={sky} src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="sky" />
      <div style={container}>
        <h3 style={{ textAlign: "center" }}>
          {city.sys.country} - {city.name}
        </h3>

        <div style={flex}>
          <span>

            {year}/{month + 1}/{day}
          </span>
          <span>

            {hour()}:{minute()}
          </span>
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
