import React from "react";
import { Navigation } from "./Navigation";
import globe from "../assets/images/earth.gif"
const Header = () => (
  <header className="header">
    <div className="blue-ribbon-container">
      <p className="blue-ribbon-text">Welcome</p>

      <Navigation />
    </div>
    <div className="content-container">
      <div className="header-flex-wrapper">
        <h1 className="header-title">Draw and Explore</h1>
        <img src={globe} className="globe-icon" alt='spinning globe'/>
      </div>
    </div>
  </header>
);

export default Header;
