import React, { Component } from "react";
import LogOutComponent from "./logOut";

class AdminNavbar extends Component {
  state = {};
  render() {
    return (
      <div className="Navbar">
        <h2 id="hAdmin">Panel administratora</h2>
        <LogOutComponent />
        <div></div>
      </div>
    );
  }
}

export default AdminNavbar;
