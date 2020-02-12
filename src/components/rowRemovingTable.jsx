import React, { Component } from "react";

class RowRemovingTable extends Component {
  deleteOffer = () => {
    const data = {
      offerID: this.props.item.OfferID
    };

    var json = JSON.stringify(data);
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8080/deleteoffer", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(this.props.item.OfferID);

    //window.location.reload();
  };

  render() {
    return (
      <tr>
        <td>{this.props.item.OfferID}</td>
        <td>{this.props.item.Manufacturer}</td>
        <td>{this.props.item.Model}</td>
        <td>{this.props.item.Type}</td>
        {/* <td>{this.props.item.Price}</td>
        <td>{this.props.item.NumberOfSeats}</td>
        <td>{this.props.item.FuelConsumption}</td>
        <td>{this.props.item.DateOfProduction}</td> */}
        <td>
          <button id={this.props.item.OfferID} onClick={this.deleteOffer}>
            Usuń
          </button>
        </td>
      </tr>
    );
  }
}

export default RowRemovingTable;
