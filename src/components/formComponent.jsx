import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { setState } from "react";

class NewOffer extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    productionDate: "",
    manufacturer: "",
    model: "",
    type: "",
    price: "",
    numberOfSeats: "",
    fuelConsuption: ""
  };

  handleSubmit(event) {
    event.preventDefault();

    const ob = {
      manufacturer: this.state.manufacturer,
      model: this.state.model,
      type: this.state.type,
      dateOfProduction: this.state.productionDate,
      price: this.state.price,
      numberOfSeats: this.state.numberOfSeats,
      fuelConsumption: this.state.fuelConsuption
    };

    var json = JSON.stringify(ob);
    console.log(json);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/createoffer", true);
    //xhr.open("POST", "http://localhost:8081/offer.json", true);
    //xhr.setRequestHeader("Content-Type", "application/json");
    //xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(json);

    //window.location.reload();
  }

  setManufacturer = event => {
    this.setState({ manufacturer: event.target.value });
  };

  setModel = event => {
    this.setState({ model: event.target.value });
  };

  setType = event => {
    this.setState({ type: event.target.value });
  };

  setProductionDate = event => {
    this.setState({ productionDate: event.target.value });
  };

  setPrice = event => {
    this.setState({ price: event.target.value });
  };

  setNumberOfSeats = event => {
    this.setState({ numberOfSeats: event.target.value });
  };

  setFuelConsumption = event => {
    this.setState({ fuelConsuption: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Utwórz nową ofertę
        </h1>
        <div>
          <span>Producent:</span>
          <input
            type="text"
            onChange={this.setManufacturer}
            value={this.state.manufacturer}
            //placeholder="xyz"
          />
        </div>
        <div>
          <span>Model samochodu:</span>
          <input
            type="text"
            onChange={this.setModel}
            value={this.state.model}
          />
        </div>
        <div>
          <span>Typ samochodu:</span>
          <input type="text" onChange={this.setType} value={this.state.type} />
        </div>
        <div>
          <span>Data produkcji:</span>
          <input
            type="number"
            name="quantity"
            min="1950"
            max="2020"
            onChange={this.setProductionDate}
            value={this.state.productionDate}
          ></input>
        </div>
        <div>
          <span>Cena wypożyczenia:</span>
          <input
            type="text"
            onChange={this.setPrice}
            value={this.state.price}
          />
        </div>
        <div>
          <span>Ilość miejsc:</span>
          <input
            type="number"
            onChange={this.setNumberOfSeats}
            value={this.state.numberOfSeats}
          />
        </div>
        <div>
          <span>Zużycie paliwa:</span>
          <input
            type="text"
            onChange={this.setFuelConsumption}
            value={this.state.fuelConsuption}
          />
        </div>
        <div>
          <input type="submit" value="Dodaj ofertę"></input>
        </div>
      </form>
    );
  }
}

export default NewOffer;
