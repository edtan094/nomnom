import React from 'react';
import AppContext from '../../lib/app-context';
import Redirect from '../components/redirect';
import TwilioButton from '../components/twilio-button';
import MapsComponent from '../components/google-maps';
import Accordion from '../components/accordion';
import parseRoute from '../../lib/parseRoute';

export default class BookmarkResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      networkError: false,
      resultFound: true,
      maps: null,
      reviews: [],
      result: {
        name: '',
        location: '',
        image: '',
        rating: null,
        id: ''
      }
    };
    this.renderBookmark = this.renderBookmark.bind(this);
    this.renderStars = this.renderStars.bind(this);
  }

  componentDidMount() {
    this.renderBookmark();
  }

  renderStars() {
    const rating = this.state.result.rating;
    const hasHalfStar = rating % 1 !== 0;
    const fullStar = Math.floor(rating);
    const emptyStar = Math.floor(5 - rating);
    const arrayStars = [];
    for (let i = 1; i <= fullStar; i++) {
      arrayStars.push(<i key={`${i}-full-star`} className="fa-solid fa-star theme-color star-size "></i>);
    }
    if (hasHalfStar) {
      arrayStars.push(<i key="1-half-star" className="fa-solid fa-star-half-stroke theme-color star-size "></i>);
    }

    for (let i = 1; i <= emptyStar; i++) {
      arrayStars.push(<i key={`${i}-empty-star`} className="fa-regular fa-star theme-color star-size "></i>);
    }
    return arrayStars;
  }

  renderBookmark() {
    const { params } = parseRoute(window.location.hash);
    const id = params.get('businessId');
    const req = {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    };
    fetch(`/api/bookmark/${id}`, req)
      .then(res => res.json())
      .then(result => {
        if (result.total === 0) {
          this.setState({ resultFound: false });
        } else {
          fetch(`/api/yelp/${id}`)
            .then(res => res.json())
            .then(reviews => {
              this.setState({
                reviews: [
                  { review: reviews.reviews[0] },
                  { review: reviews.reviews[1] },
                  { review: reviews.reviews[2] }
                ]
              });
            })
            .catch(err => console.error(err));
          this.setState({
            resultFound: true,
            result: {
              name: result[0].name,
              address1: result[0].address1,
              address2: result[0].address2,
              address3: result[0].address3,
              city: result[0].city,
              state: result[0].state,
              zipcode: result[0].zipcode,
              image: result[0].image,
              rating: result[0].rating,
              id: result[0].id
            },
            maps: { lat: parseFloat(result[0].latitude), lng: parseFloat(result[0].longitude) }
          });
          this.renderStars();
        }
      })
      .catch(err => {
        this.setState({ networkError: true });
        console.error(err);
      });
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    if (this.state.networkError) {
      return (
        <>
          <div className='row justify-center'>
            <p className='font-size-30'>Sorry! There was an error connecting to the network!<br></br>
              Please check your internet connection and try again.
            </p>
          </div>
          <div className='row justify-center'>
            <img className='sad-cookie-image' src='./images/sad-cookie-image.jpg'></img>
          </div>
        </>
      );
    }
    if (this.state.resultFound === true && this.state.result.name === '') {
      return (
        <div className='row justify-center margin-top'>
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      );
    } else {
      return (
        <>
          <div className='row'>
            <div className='row column-one-third'>
              <div className='result-image-container row align-items-end'>
                <img src={this.state.result.image} className='result-image'></img>
              </div>
            </div>
            <div className='column-two-thirds'>
              <h4 className='roboto-font margin-top result-title-size'>{this.state.result.name}</h4>
              <div className='margin-bottom-10'>
                {this.renderStars().map(rating => rating)}
              </div>
              <div className='row-column-responsive'>
                <div className='column-half'>
                  <p className='restaurant-info result-info-size roboto-font'>{this.state.result.address1}</p>
                  <p className='restaurant-info result-info-size roboto-font'>{this.state.result.address2}</p>
                  <p className='restaurant-info result-info-size roboto-font'>{this.state.result.city} {this.state.result.state} {this.state.result.zipcode}</p>
                </div>
                <div className='column-half'>
                  <TwilioButton address={{ display_address: [this.state.result.address1, this.state.result.address2, this.state.result.address3, this.state.result.city, this.state.result.state, this.state.result.zipcode] }
                  }
                  name={this.state.result.name} />
                </div>
              </div>
            </div>
          </div>
          <div className='row justify-center'>
            <MapsComponent maps={this.state.maps} />
          </div>
          <Accordion reviews={this.state.reviews} />
        </>
      );
    }
  }
}

BookmarkResult.contextType = AppContext;