import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preference: '',
      location: ''
    };
    this.handleInputPreference = this.handleInputPreference.bind(this);
    this.handleInputLocation = this.handleInputLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputPreference(event) {
    this.setState({ preference: event.target.value });
  }

  handleInputLocation(event) {
    this.setState({ location: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.hash = `result?term=${this.state.preference}&location=${this.state.location}`;
  }

  render() {
    return (
      <div className='row center-of-page vh-height'>
        <form onSubmit={this.handleSubmit} method='get' className='home-page-form'>
          <div className='row'>
            <label className='font-theme home-page-font-size padding-right'>I want to eat</label>
            <select className='select-theme' onChange={this.handleInputPreference} value={this.state.preference} name='preferences' required>
              <option value="">Select a Value</option>
              <option value="no preference">No preference</option>
              <option value="tradamerican">American</option>
              <option value="brazilian">Brazilian</option>
              <option value="breakfast_brunch">Brunch</option>
              <option value="burgers">Burgers</option>
              <option value="cafes">Cafes</option>
              <option value="chicken_wings">Chicken Wings</option>
              <option value="chinese">Chinese</option>
              <option value="comfortfood">Comfort Food</option>
              <option value="hotdogs">Fast Food</option>
              <option value="filipino">Filipino</option>
              <option value="fishnchips">Fish & Chips</option>
              <option value="french">French</option>
              <option value="gastropubs">Gastropubs</option>
              <option value="german">German</option>
              <option value="greek">Greek</option>
              <option value="halal">Halal</option>
              <option value="hawaiian">Hawaiian</option>
              <option value="hkcafe">Hong Kong Style Cafe</option>
              <option value="hotpot">Hot Pot</option>
              <option value="indpak">Indian</option>
              <option value="irish">Irish</option>
              <option value="italian">Italian</option>
              <option value="japanese">Japanese</option>
              <option value="korean">Korean</option>
              <option value="latin">Latin American</option>
              <option value="malaysian">Malaysian</option>
              <option value="mediterranean">Mediterranean</option>
              <option value="mexican">Mexican</option>
              <option value="mideastern">Middle Eastern</option>
              <option value="noodles">Noodles</option>
              <option value="pakistani">Pakistani</option>
              <option value="persian">Persian/Iranian</option>
              <option value="peruvian">Peruvian</option>
              <option value="pizza">Pizza</option>
              <option value="polish">Polish</option>
              <option value="portuguese">Portuguese</option>
              <option value="poutineries">Poutineries</option>
              <option value="russian">Russian</option>
              <option value="salad">Salad</option>
              <option value="sandwiches">Sandwiches</option>
              <option value="singaporean">Singaporean</option>
              <option value="soup">Soup</option>
              <option value="spanish">Spanish</option>
              <option value="steak">SteakHouses</option>
              <option value="sushi">Sushi Bars</option>
              <option value="taiwanese">Taiwanese</option>
              <option value="tapasmallplates">Tapas/Small Plates</option>
              <option value="thai">Thai</option>
              <option value="turkish">Turkish</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vietnamese">Vietnamese</option>
              <option value="waffles">Waffles</option>
            </select>
          </div>
          <div className='row padding-top'>
            <label className='font-theme home-page-font-size padding-right'>at</label>
            <input onChange={this.handleInputLocation} value={this.state.location} className='input-theme' placeholder="location..." type="text" htmlFor='at' id='at' required></input>
          </div>
          <div className='row justify-end-safari'>
            <input className='search-button' type="submit" value="SEARCH"></input>
          </div>
        </form>
      </div>
    );
  }
}
