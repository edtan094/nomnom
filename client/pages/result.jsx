import React from 'react';
import { parseRoute } from '../../lib';
import MapsComponent from '../components/google-maps';
import Accordion from '../components/accordion';
export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {
        name: '',
        location: '',
        image: '',
        rating: null
      },
      reviews: {
        first: {},
        second: {},
        third: {}
      },
      maps: null,
      listOfStarsRatings: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.renderStars = this.renderStars.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
  }

  renderStars() {
    const rating = this.state.result.rating;
    const hasHalfStar = rating % 1 !== 0;
    const fullStar = Math.floor(rating);
    const emptyStar = Math.floor(5 - rating);
    const arrayStars = [];
    for (let i = 1; i <= fullStar; i++) {
      arrayStars.push(<i key={`${i}-full-star`} className="fa-solid fa-star"></i>);
    }
    if (hasHalfStar) {
      arrayStars.push(<i key="1-half-star" className="fa-solid fa-star-half-stroke"></i>);
    }

    for (let i = 1; i <= emptyStar; i++) {
      arrayStars.push(<i key={`${i}-empty-star`} className="fa-regular fa-star"></i>);
    }
    this.setState({ listOfStarsRatings: arrayStars });
  }

  handleSearch() {
    const { params } = parseRoute(window.location.hash);
    const term = params.get('term');
    const location = params.get('location');
    const body = {
      method: 'GET'
    };
    let businessId;
    fetch(`/api/yelp/${term}/${location}`, body)
      .then(res => res.json())
      .then(result => {
        businessId = result.id;
        fetch(`/api/yelp/${businessId}`, body)
          .then(res => res.json())
          .then(reviews => {
            this.setState({
              reviews: {
                first: reviews.reviews[0],
                second: reviews.reviews[1],
                third: reviews.reviews[2]
              }
            });
          })
          .catch(err => console.error(err));
        this.setState({
          result: { name: result.name, location: result.location, image: result.image_url, rating: result.rating },
          maps: { lat: result.coordinates.latitude, lng: result.coordinates.longitude }
        });
        this.renderStars();
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
      <div className='row'>
        <div className='column-half'>
          <div className='result-image-container row justify-center margin-top-responsive'>
            <img src={this.state.result.image} className='result-image'></img>
          </div>
        </div>
        <div className='column-half'>
          <h4 className='roboto-font margin-top result-title-size'>{this.state.result.name}</h4>
            <div>
              {this.state.listOfStarsRatings.map(rating => rating)}
          </div>
          <p className='restaurant-info result-info-size'>{this.state.result.location.address1}</p>
          <p className='restaurant-info result-info-size'>{this.state.result.location.address2}</p>
          <p className='restaurant-info result-info-size'>{this.state.result.location.city} {this.state.result.location.state} {this.state.result.location.zip_code}</p>
            <MapsComponent maps={this.state.maps} />
        </div>
        <div>{this.state.result.rating}</div>
      </div>
      <Accordion reviews={this.state.reviews}/>
      </>
    );
  }
}
