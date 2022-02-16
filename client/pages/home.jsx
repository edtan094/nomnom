import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preference: '',
      location: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputPreference = this.handleInputPreference.bind(this);
    this.handleInputLocation = this.handleInputLocation.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    const body = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    fetch(`/yelp/${this.state.preference}/${this.state.location}`, body)
      .then(res => res.json())
      .then(result => console.log(result));
  }

  handleInputPreference(event) {
    this.setState({ preference: event.target.value });
  }

  handleInputLocation(event) {
    this.setState({ location: event.target.value });
  }

  render() {
    return (
    <div className='row center-of-page vh-height'>
      <form onSubmit={this.handleSearch} method='get' className='home-page-form'>
        <div className='row'>
          <label className='font-theme home-page-font-size padding-right'>I want to eat</label>
          <input onChange={this.handleInputPreference} value={this.state.preference} className='input-params' placeholder='type of food...' type="text" htmlFor='eat' id='eat' required></input>
        </div>
        <div className='row padding-top'>
          <label className='font-theme home-page-font-size padding-right'>at</label>
          <input onChange={this.handleInputLocation} value={this.state.location} className='input-params' placeholder="city name..." type="text" htmlFor='at' id='at' required></input>
        </div>
        <div className='row justify-end'>
          <input className='search-button' type="submit" value="SEARCH"></input>
        </div>
      </form>
    </div>
    );
  }
}
