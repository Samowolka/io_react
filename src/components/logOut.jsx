import React, { Component } from "react";
class LogOutComponent extends Component {
  // state = {  }
  handleLogOut = () => {
    console.log("Nastepuje wylogowanie");
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {

        if (xhr.responseText === 'true') {
          window.location.href = "http://localhost:8080/login";
        }
        else {
          alert("Nie udało się wylogować.");
        }
      }
    }
    xhr.open("GET", "http://localhost:8080/logout", true);
    xhr.send();
  };
  render() {
    return <button onClick={this.handleLogOut}>Wyloguj</button>;
  }
}

export default LogOutComponent;
