import React from 'react';

// export default function Home(props) {
//   return (
//     <div className='row center-of-page vh-height'>
//       <form onSubmit={props.search} method='get' className='home-page-form'>
//         <div className='row'>
//           <label className='font-theme home-page-font-size padding-right'>I want to eat</label>
//           <input onChange={props.preference} value={props.preferenceValue} className='input-params' placeholder='type of food...' type="text" htmlFor='eat' id='eat' required></input>
//         </div>
//         <div className='row padding-top'>
//           <label className='font-theme home-page-font-size padding-right'>at</label>
//           <input onChange={props.location} value={props.locationValue} className='input-params' placeholder="city name..." type="text" htmlFor='at' id='at' required></input>
//         </div>
//         <div className='row justify-end'>
//           <input className='search-button' type="submit" value="SEARCH"></input>
//         </div>
//       </form>
//     </div>
//   );
// }

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
    window.location.hash = `result?term=${this.state.preference}&location=${this.state.location}`;
  }

  render() {
    return (
      <div className='row center-of-page vh-height'>
        <form onSubmit={this.handleSubmit} method='get' className='home-page-form'>
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
