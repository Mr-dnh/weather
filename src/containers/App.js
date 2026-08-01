import React, { useState } from "react";
import City from "../components/cities";
import CityContext from "../components/context";

const App = () => {

  const [city, setCity] = useState();
  const [forecast, setForecast] = useState();
  const [name, setname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewCity = data => {
    setCity(data)
  }

  const header = {
    color: "#FFF",
    textAlign: "center",
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
      <City />
    </CityContext.Provider>
  );
};

export default App;