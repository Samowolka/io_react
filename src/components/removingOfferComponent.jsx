import React, { Component } from "react";

import RowRemovingTable from "./rowRemovingTable";

class RemovingOffer extends Component {
  state = {
    allOffers: Array(0),
    tableVisible: false
  };

  getOffers = () => {
    let offersArray = [];

    const xhr = new XMLHttpRequest();

    xhr.onload = function(e) {
      if (xhr.status === 200) {
        let responseArray = JSON.parse(xhr.response);
        for (let i = 0; i < responseArray.length; i++) {
          let data = [];
          data = {
            OfferID: responseArray[i].offerID,
            Manufacturer: responseArray[i].manufacturer,
            Model: responseArray[i].model,
            Type: responseArray[i].type,
            Price: responseArray[i].price,
            NumberOfSeats: responseArray[i].numberOfSeats,
            FuelConsumption: responseArray[i].fuelConsumption,
            DateOfProduction: responseArray[i].dateOfProduction
          };

          offersArray.push(data);
        }
        this.setState({
          allOffers: offersArray
        });
      }
    }.bind(this);

    xhr.open("GET", "http://localhost:8080/getoffers", true);
    xhr.send();

    this.setState({ tableVisible: true });
  };

  render() {
    if (!this.state.tableVisible) {
      return (
        <div>
          <h4>
            Nie można cofnąć operacji usuwania oferty. Kontynuować?
          </h4>
          <button onClick={this.getOffers}>A jakże!</button>
        </div>
      );
    } else if (this.state.tableVisible) {
      return (
        <div className="offersItems">
          <table>
            <thead>
              <tr>
                <th>ID oferty</th>
                <th>Producent</th>
                <th>Model</th>
                <th>Typ</th>
                {/* <th>Price</th>
                <th>Seats</th>
                <th>Fuel consumption</th>
                <th>Production date</th> */}
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allOffers.map((value, key) => (
                <RowRemovingTable item={value} key={value.OfferID} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default RemovingOffer;
