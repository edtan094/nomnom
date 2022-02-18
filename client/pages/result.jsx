import React from 'react';
import { parseRoute } from '../../lib';
import MapsComponent from '../components/google-maps';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {
        name: '',
        location: '',
        image: ''
      },
      maps: null
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch() {
    const { params } = parseRoute(window.location.hash);
    const term = params.get('term');
    const location = params.get('location');
    const body = {
      method: 'GET'
    };
    fetch(`/api/yelp/${term}/${location}`, body)
      .then(res => res.json())
      .then(result => {
        this.setState({
          result: { name: result.name, location: result.location, image: result.image_url },
          maps: { lat: result.coordinates.latitude, lng: result.coordinates.longitude }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='row'>
        <div className='column-half'>
          <div className='result-image-container row justify-center'>
            <img src={this.state.result.image} className='result-image margin-top-responsive'></img>
          </div>
        </div>
        <div className='column-half'>
          <h4 className='roboto-font margin-top result-title-size'>{this.state.result.name}</h4>
          <p className='restaurant-info result-info-size'>{this.state.result.location.address1}</p>
          <p className='restaurant-info result-info-size'>{this.state.result.location.address2}</p>
          <p className='restaurant-info result-info-size'>{this.state.result.location.city} {this.state.result.location.state} {this.state.result.location.zip_code}</p>
          <MapsComponent maps={this.state.maps}/>
        </div>
      </div>
    );
  }
}
