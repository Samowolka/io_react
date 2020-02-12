import React, { Component } from "react";

class RaportListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.RentalID}</td>
        <td>{this.props.item.CustomerID}</td>
        <td>{this.props.item.CarID}</td>
        <td>{this.props.item.Start}</td>
        <td>{this.props.item.End}</td>
      </tr>
    );
  }
}

export default RaportListItem;
