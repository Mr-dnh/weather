import React, { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import City from "../components/cities";
import CityContext from "../components/context";
import Input from "../components/input";
import About from "../components/about"

const App = () => {

  const [city, setCity] = useState();
  const [name, setname] = useState("");

  const handleNewCity = data => {
    setCity(data)
  }

  const header = {
    color: "#FFF",
    textAlign: "center",
  };

  return (
    <CityContext.Provider value={{ city, handleNewCity, setname, name }}>
      <div className="background home-bg"></div>
      <div className="nav">
        <NavLink to="/" ><h1 style={header}>آب و هوا</h1></NavLink>
        <NavLink to="/About" ><h1 style={header}>درباره من</h1></NavLink>
      </div>
      <Routes>
        <Route path="/about" activeClassName='active' element={<About />} />
        <Route path="/" element={<div> <Input/> <City/> </div>} />
      </Routes>


    </CityContext.Provider>
  );
};

export default App;

