import React from "react";
import Header from "./Header"

const Layout = ( props ) => (
  <div className="layout">
    <div className="content-container">
      <Header />
      {props.children}
    </div>
  </div>
);

export default Layout;
