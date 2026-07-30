import React, { useContext } from "react";
import CityContext from "./context";

const Input = () => {
  const container = {
    borderRadius: "8px",
    margin: "1em 5%",
    display: "grid",
    gridTemplateColumns: "1fr 56px",
    overflow: "hidden",
  };

  const input = {
    background: "#ccc6",
    width: "100%",
    padding: "0 5px",
    fontSize: "1.3em",
    border: "none",
    outline: "none",
    direction: "rtl",
  };

  const button = {
    fontSize: "1.5em",
    background: "#ccc7",
    border: "none",
  };


  const context = useContext(CityContext);

  const getText = async () => {
    try {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${context.name}&appid=46b48f038088d19e34ae8ef5a3504426&lang=fa`
      )
        .then((res) => res.text())
        .then((data) => JSON.parse(data))
        .then((data) => context.handleNewCity(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleName = (e) => {
    context.setname(e.target.value);
  };

  return (
    <div>
      <form style={container} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="نام شهر را وارد کنید..."
          value={context.name}
          onChange={handleName}
          style={input}
        />
        <button onClick={() => getText()} type="submit" style={button}>
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default Input;
