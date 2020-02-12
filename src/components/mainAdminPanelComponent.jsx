import React, { Component } from "react";
import AdminNavbar from "./adminNavbarComponent";
import "../components-style/navbarStyle.css";
import MainWindow from "./helloComponent";
import "../components-style/helloStyle.css";

class MainAdminPanel extends Component {
  state = {};

  render() {
    return (
      <div>
        <AdminNavbar />
        <MainWindow></MainWindow>
      </div>
    );
  }
}

export default MainAdminPanel;
