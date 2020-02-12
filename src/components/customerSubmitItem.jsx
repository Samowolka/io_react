import React, { Component } from "react";

class CustomerSubmitItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.CustomerID}</td>
        <td>{this.props.item.Rentals}</td>
      </tr>
    );
  }
}

export default CustomerSubmitItem;
