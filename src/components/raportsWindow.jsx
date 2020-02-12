import React, { Component } from "react";

//import data from "../data/archive.json";
import RaportListItem from "./raportListItem";
import CarSubmitItem from "./carSubmitItem";
import CustomerSubmitItem from "./customerSubmitItem";

class RaportsWindow extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    startDate: new Date(),
    endDate: new Date(),

    // startDate: new Date().toISOString().slice(0, 10),
    // endDate: new Date().toISOString().slice(0, 10),

    allResults: Array(0),
    //displayResultIndices: Array(0),
    foundedResultsToDisplay: Array(0),
    carSubmitToDisplay: Array(0),
    customerSubmitToDisplay: Array(0),
    //resultsAmount: 0,
    ifRaportVisible: false
  };

  archiveData() {

    let allResultsArray = [];
    let foundedResults = [];

    const xhr = new XMLHttpRequest();

    xhr.onload = function(e) {
      if (xhr.status === 200) {
        let responseArray = JSON.parse(xhr.response);
        for (let i = 0; i < responseArray.length; i++) {
          let data = [];
          let tmpStart, tmpEnd;
          tmpStart = new Date(responseArray[i].startDate);
          tmpStart.setDate(tmpStart.getDate()+1);
          
          tmpEnd = new Date(responseArray[i].endDate);
          tmpEnd.setDate(tmpEnd.getDate()+1);
          console.log(tmpStart);
          console.log(tmpEnd);

          data = {
            RentalID: responseArray[i].reservationID,
            CustomerID: responseArray[i].customerID,
            CarID: responseArray[i].offerID,
            Start : tmpStart.toISOString().slice(0,10),
            End: tmpEnd.toISOString().slice(0,10),
            
          };

          allResultsArray.push(data);
          console.log(allResultsArray);
        }
        
        this.setState({
          allResults: allResultsArray
        });
      }
    }.bind(this);

    xhr.open("GET", "http://localhost:8080/getarchive", false);
    xhr.send();

    var sDate = Date.parse(this.state.startDate);
    var eDate = Date.parse(this.state.endDate);
    //let x = 0;

    for (let i = 0; i < allResultsArray.length; i++) {
      if (
        Date.parse(allResultsArray[i].Start) >= sDate &&
        Date.parse(allResultsArray[i].Start) <= eDate
      ) {
        //x += 1;
        //resultsIndicesToDisplay.push(i);
        foundedResults.push(allResultsArray[i]);
      }
    }

    this.setState({
      //resultsAmount: x,
      allResults: allResultsArray,
      // displayResultIndices: resultsIndicesToDisplay,
      foundedResultsToDisplay: foundedResults
    });

    let carIDArray = [];
    for (let i = 0; i < foundedResults.length; i++) {
      let myID = foundedResults[i].CarID;
      let inTable = false;
      for (let j = 0; j < carIDArray.length; j++) {
        if (myID == carIDArray[j]) {
          inTable = true;
        }
      }
      if (inTable == false) {
        carIDArray.push(foundedResults[i].CarID);
      }
    }

    let carSubmitArray = [];
    for (let i = 0; i < carIDArray.length; i++) {
      let myID = carIDArray[i];
      let howMany = 0;
      for (let j = 0; j < foundedResults.length; j++) {
        if (myID == foundedResults[j].CarID) {
          howMany += 1;
        }
      }
      let data = {};
      data = {
        CarID: myID,
        Rentals: howMany
      };

      carSubmitArray.push(data);
    }

    //////////////////////Customers
    let customerIDArray = [];
    for (let i = 0; i < foundedResults.length; i++) {
      let myID = foundedResults[i].CustomerID;
      let inTable = false;
      for (let j = 0; j < customerIDArray.length; j++) {
        if (myID == customerIDArray[j]) {
          inTable = true;
        }
      }
      if (inTable == false) {
        customerIDArray.push(foundedResults[i].CustomerID);
      }
    }

    let customerSubmitArray = [];
    for (let i = 0; i < customerIDArray.length; i++) {
      let myID = customerIDArray[i];
      let howMany = 0;
      for (let j = 0; j < foundedResults.length; j++) {
        if (myID == foundedResults[j].CustomerID) {
          howMany += 1;
        }
      }
      let data = {};
      data = {
        CustomerID: myID,
        Rentals: howMany
      };

      customerSubmitArray.push(data);
    }

    this.setState({
      customerSubmitToDisplay: customerSubmitArray,
      carSubmitToDisplay: carSubmitArray
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.archiveData();
    // var that = this;
    // const xhr = new XMLHttpRequest();

    // xhr.responseType = "json";
    // var json;
    // let usersArray = [];

    // xhr.addEventListener("load", function() {
    //   if (xhr.status === 200) {
    //     // for (const el of xhr.response) {
    //     //   usersArray.push(el);
    //     // }
    //     // that.setState({ amountUser: usersArray.length });

    //     console.log(xhr.response);
    //   }
    // });

    // xhr.open("GET", "http://localhost:8080/getusers", true);

    // xhr.send();

    this.setState({ ifRaportVisible: true });
  };

  setStartDate = event => {
    this.setState({ startDate: event.target.value });
  };

  setEndDate = event => {
    this.setState({ endDate: event.target.value });
  };

  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    });
  }

  //component;

  render() {
    if (this.state.ifRaportVisible == false) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <span>Data początkowa: </span>
            <input
              type="date"
              onChange={this.setStartDate}
              value={this.state.startDate}
            />
          </div>
          <div>
            <span>Data końcowa: </span>
            <input
              type="date"
              onChange={this.setEndDate}
              value={this.state.endDate}
            />
          </div>
          <div>
            <input type="submit" value="Generuj raport"></input>
          </div>
        </form>
      );
    }
    if (this.state.ifRaportVisible) {
      // let allResultsArray = [...this.state.allResults];
      // let resultsIndicesToDisplay = [...this.state.displayResultIndices];
      return (
        <div>
          <div>
            <h1>Raport</h1>
            <h2>
              Od {this.state.startDate} do {this.state.endDate}
            </h2>
            <h4> Data wygenerowania raportu: {this.state.date}</h4>
          </div>
          <div>
            {/* <h2> Found {this.state.displayResultIndices.length} results </h2>
            <div className="offersItems">
              <table>
                <thead>
                  <tr>
                    <th>RentalID</th>
                    <th>CustomerID</th>
                    <th>CarID</th>
                    <th>Start</th>
                    <th>End</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.displayResultIndices.map((itemId, key) => (
                    <RaportListItem
                      item={this.state.allResults[itemId]}
                      key={this.state.allResults[itemId].RentalID}
                    />
                  ))}
                </tbody>
              </table>
            </div> */}
          </div>
          <div>
            <h2> Znaleziono {this.state.foundedResultsToDisplay.length} wyników</h2>
            <div className="offersItems">
              <table>
                <thead>
                  <tr>
                    <th>ID rezerwacji</th>
                    <th>ID klienta</th>
                    <th>ID oferty</th>
                    <th>Data początkowa</th>
                    <th>Data końcowa</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.foundedResultsToDisplay.map((value, key) => (
                    <RaportListItem item={value} key={value.RentalID} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2> Statystyki (oferty) </h2>
            <div className="offersItems">
              <table>
                <thead>
                  <tr>
                    <th>ID oferty</th>
                    <th>Ilość wypożyczeń</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.carSubmitToDisplay.map((value, key) => (
                    <CarSubmitItem item={value} key={value.CarID} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2> Statystyki (klienci) </h2>
            <div className="offersItems">
              <table>
                <thead>
                  <tr>
                    <th>ID klienta</th>
                    <th>Ilość dokonanych rezerwacji</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.customerSubmitToDisplay.map((value, key) => (
                    <CustomerSubmitItem item={value} key={value.CustomerID} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default RaportsWindow;
