import react, { CSSProperties, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./test.css";

const Navbar = () => {
  const [productHovered, setProductHovered] = useState(false);
  const [createHovered, setCreateHovered] = useState(false);

  function getRandomColor() {
    const red = Math.floor(Math.random() * 128);
    const green = Math.floor(Math.random() * 128);
    const blue = Math.floor(Math.random() * 128);

    return `rgba(${red}, ${green}, ${blue}, 1)`;
  }

  const renderBackgroundEffect = () => {
    return (
      <div className="backgroundEffectContainer">
        {[...Array(50)].map((item, index) => {
          return (
            <div className="container">
              <div
                className="line"
                style={{
                  animation: `moveLine ${Math.random()}s linear infinite`,
                  animationDelay: `${Math.random()}s`,
                  backgroundColor: getRandomColor(),
                }}
              ></div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <nav style={navStyle}>
      <div style={navbarContainerStyle}>
        <Link
          style={productHovered ? { ...itemStyle, ...hoverStyle } : itemStyle}
          onMouseEnter={() => setProductHovered(true)}
          onMouseLeave={() => setProductHovered(false)}
          to="/products"
        >
          {productHovered && renderBackgroundEffect()}
          <div className="buttonTextStyle">Products</div>
        </Link>

        <Link
          style={createHovered ? { ...itemStyle, ...hoverStyle } : itemStyle}
          onMouseEnter={() => setCreateHovered(true)}
          onMouseLeave={() => setCreateHovered(false)}
          to="/create"
        >
          {createHovered && renderBackgroundEffect()}
          <div className="buttonTextStyle">Create</div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

const navStyle: CSSProperties = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
};
const navbarContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: 1100,
};

const itemStyle: CSSProperties = {
  width: "50%",
  height: 200,
  color: "white",
  textDecoration: "none",
  fontWeight: 800,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 40,
  cursor: "pointer",
  background: "var(--main-blue)",
  transition: "background-color 0.3s, box-shadow 0.3s",
  overflow: "hidden",
};

const hoverStyle: CSSProperties = {
  background: "#0404c7",
  boxShadow:
    "inset 20px 0 40px rgba(255, 255, 255, 0.1), inset 20px 0 20px rgba(0, 0, 0, 0.5)",
};

const buttonTextStyle: CSSProperties = {
  position: "absolute",
};
