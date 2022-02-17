import React from 'react';
import { parseRoute } from '../../lib';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {
        name: '',
        location: '',
        image: ''
      }
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    const { params } = parseRoute(window.location.hash);
    const term = params.get('term');
    const location = params.get('location');
    const body = {
      method: 'GET'
    };
    console.log(term);
    console.log(location);
    fetch(`/api/yelp/${term}/${location}`, body)
      .then(res => {
        console.log(res.json());
        return res.json();
      })
      .then(result => {
        console.log(result);
        this.setState({
          result: { name: result.name, location: result.location, image: result.image_url }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    this.handleSearch();
    return (
      <div className='row'>
        <div className='column-half'>
          <h4 className='roboto-font'>{this.state.result.name}</h4>
          <p>{this.state.result.location}</p>
        </div>
        <div className='column-half'>
          <div className='result-image-container'>
            <img src={this.state.result.image} className='result-image'></img>
          </div>
        </div>
      </div>
    );
  }
}
