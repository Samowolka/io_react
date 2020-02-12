import React, { Component } from 'react';
class ManageOffersComponent extends Component {
   // state = {  }
   handleOffers = () => {
    console.log('Oferty');
   };
    render() { 
        return (  
            <React.Fragment>
            <button onClick = {this.handleOffers}>
                Manage Offers

            </button>
        </React.Fragment>
        );
    }
}
 
export default ManageOffersComponent;