import { createContext } from "react";

const CityContext = createContext({
  city: {},
  handleNewCity: () => {},
  name: "",
  setname: () => {}
});

export default CityContext;
