import React, { Component } from "react";

class CarSubmitItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.CarID}</td>
        <td>{this.props.item.Rentals}</td>
      </tr>
    );
  }
}

export default CarSubmitItem;
