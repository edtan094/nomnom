import React from 'react';
import parseRoute from '../../lib/parseRoute';
import MapsComponent from '../components/google-maps';
import Accordion from '../components/accordion';
import TwilioButton from '../components/twilio-button';
import NoResultFound from '../components/no-result-found';
import Rating from '../components/rating';
import Redirect from '../components/redirect';
import AppContext from '../../lib/app-context';
export default class Result extends React.Component {
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
      },
      bookmarked: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.checkBookmark = this.checkBookmark.bind(this);
    this.bookmarkButton = this.bookmarkButton.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch() {
    const { params } = parseRoute(window.location.hash);
    const term = params.get('term');
    const location = params.get('location');
    let businessId;
    fetch(`/api/yelp/${term}/${location}`)
      .then(res => res.json())
      .then(result => {
        if (result.total === 0) {
          this.setState({ resultFound: false });
        } else {
          businessId = result.id;
          fetch(`/api/yelp/${businessId}`)
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
            result: { name: result.name, location: result.location, image: result.image_url, rating: result.rating, id: result.id },
            maps: { lat: result.coordinates.latitude, lng: result.coordinates.longitude }
          });
          this.checkBookmark();
        }
      })
      .catch(err => {
        this.setState({ networkError: true });
        console.error(err);
      });
  }

  handleBookmark() {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      },
      body: JSON.stringify({ state: this.state })
    };
    fetch('/api/bookmarks', req)
      .then(res => res.json())
      .then(result => this.setState({ bookmarked: true }))
      .catch(err => console.error(err));
  }

  checkBookmark() {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    };
    fetch('/api/bookmarked', req)
      .then(res => res.json())
      .then(result => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].businessId === this.state.result.id) {
            this.setState({ bookmarked: true });
            break;
          }
        }
      })
      .catch(err => console.error(err));
  }

  deleteBookmark() {
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      },
      body: JSON.stringify({ businessId: this.state.result.id })
    };
    fetch('/api/bookmark', req)
      .then(result => this.setState({ bookmarked: false }))
      .catch(err => console.error(err));
  }

  bookmarkButton() {
    const arrayButton = [];
    if (this.state.bookmarked) {
      arrayButton.push(<button key={1} onClick={this.deleteBookmark} className='bookmark-button margin-left'><i className="star-size fa-solid fa-bookmark"></i></button>);
    } else {
      arrayButton.push(<button key={1} onClick={this.handleBookmark} className='bookmark-button margin-left'><i className="fa-regular fa-bookmark star-size"></i></button>);
    }
    return arrayButton;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.bookmarked !== prevState.bookmarked) {
      this.bookmarkButton();
    }
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
    }

    if (!this.state.resultFound) {
      return <NoResultFound />;
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
                <Rating rating={this.state.result.rating}/>
                {this.bookmarkButton().map(button => button)}
              </div>
              <div className='row-column-responsive'>
                <div className='column-half'>
                  <p className='restaurant-info result-info-size roboto-font'>{this.state.result.location.address1}</p>
                  <p className='restaurant-info result-info-size roboto-font'>{this.state.result.location.address2}</p>
                  <p className='restaurant-info result-info-size roboto-font'>{this.state.result.location.city} {this.state.result.location.state} {this.state.result.location.zip_code}</p>
                </div>
                <div className='column-half'>
                  <TwilioButton address={this.state.result.location} name={this.state.result.name}/>
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

Result.contextType = AppContext;
