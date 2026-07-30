import React from "react";

const About = () => {
  const container = {
    backgroundImage: "linear-gradient(to right, rgb(89 166 175), #161972) ",
    width: "200px",
    height: "200px",
    margin: "50px auto",
    borderRadius: "70% 40% 30% 80% / 55% 45% 69% 59%",
    boxShadow: '0 0 14px #0000ffbf',
  };

  const style1 = {
    textAlign: "center",
    paddingTop: '35%'
  };

  return (
    <div>
      <div className="background about-bg"></div>
      <div style={container}>
        <div style={style1}>
          <p>made by Aidin ✌🍕</p>
          <span>idndnydh@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default About;
