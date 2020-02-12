import React, { Component } from "react";
import RaportsWindow from "./raportsWindow";
import OffersDisplay from "./offersDisplay";
import NewOffer from "./formComponent";
import RemovingOffer from "./removingOfferComponent";

class MainWindow extends Component {
  state = {
    mainActive: true,
    addOfferActive: false,
    raportActive: false,
    lookOfferActive: false,
    removeOfferActive: false
  };

  handleShowMain = () => {
    this.setState({
      mainActive: true,
      addOfferActive: false,
      raportActive: false,
      lookOfferActive: false,
      removeOfferActive: false
    });
  };

  handleAddOffer = () => {
    this.setState({
      mainActive: false,
      addOfferActive: true,
      raportActive: false,
      lookOfferActive: false,
      removeOfferActive: false
    });
  };
  handleLookOffer = () => {
    this.setState({
      mainActive: false,
      addOfferActive: false,
      raportActive: false,
      lookOfferActive: true,
      removeOfferActive: false
    });
  };
  handleRaport = () => {
    this.setState({
      mainActive: false,
      addOfferActive: false,
      raportActive: true,
      lookOfferActive: false,
      removeOfferActive: false
    });
  };
  handleRemoveOffer = () => {
    this.setState({
      mainActive: false,
      addOfferActive: false,
      raportActive: false,
      lookOfferActive: false,
      removeOfferActive: true
    });
  };

  render() {
    if (this.state.mainActive) {
      return (
        <div className="helloMain">
          <h4>Witaj pracowniku!</h4>
          <h5>Co chcesz zrobić?</h5>
          <div className="buttons">
            <button onClick={this.handleLookOffer}>Zobacz wszystkie oferty</button>
            <button id="offerBtn" onClick={this.handleAddOffer}>
              Utwórz nową ofertę
            </button>
            <button onClick={this.handleRemoveOffer}>
              Usuń istniejącą ofertę
            </button>
            <button onClick={this.handleRaport}>Generuj raport</button>
          </div>
        </div>
      );
    } else if (this.state.addOfferActive) {
      return (
        <div>
          <h5> </h5>
          <NewOffer />
          <button onClick={this.handleShowMain}>Powrót</button>
        </div>
      );
    } else if (this.state.lookOfferActive) {
      return (
        <div>
          <h5>Zobacz wszystkie oferty</h5>
          <OffersDisplay />
          <button onClick={this.handleShowMain}>Powrót</button>
        </div>
      );
    } else if (this.state.raportActive) {
      return (
        <div className="raportView">
          <RaportsWindow />
          <button onClick={this.handleShowMain}>Powrót</button>
        </div>
      );
    } else if (this.state.removeOfferActive) {
      return (
        <div>
          <RemovingOffer />
          <button onClick={this.handleShowMain}>Powrót</button>
        </div>
      );
    }
  }
}

export default MainWindow;
