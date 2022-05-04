import React, { useContext, useState, useEffect } from 'react';
import parseRoute from '../../lib/parseRoute';
import MapsComponent from '../components/google-maps';
import Accordion from '../components/accordion';
import TwilioButton from '../components/twilio-button';
import NoResultFound from '../components/no-result-found';
import LoadingSpinner from '../components/loading-spinner';
import Rating from '../components/rating';
import Redirect from '../components/redirect';
import AppContext from '../../lib/app-context';

export default function Result(props) {

  const [networkError, setNetworkError] = useState(false);
  const [resultFound, setResultFound] = useState(true);
  const [maps, setMaps] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [result, setResult] = useState({
    name: '',
    location: '',
    image: '',
    rating: null,
    id: ''
  });

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    checkBookmark();
  }, [result.id]);

  const handleSearch = async () => {
    const { params } = parseRoute(window.location.hash);
    const term = params.get('term');
    const location = params.get('location');
    let businessId;
    try {
      const res = await fetch(`/api/yelp/search/${term}/${location}`);
      const result = await res.json();
      if (result.total === 0) {
        setResultFound(false);
      } else {
        businessId = result.id;
        const resReviews = await fetch(`/api/yelp/${businessId}`);
        const reviews = await resReviews.json();
        setNetworkError(false);
        setResultFound(true);
        setResult({ name: result.name, location: result.location, image: result.image_url, rating: result.rating, id: result.id });
        setMaps({ lat: result.coordinates.latitude, lng: result.coordinates.longitude });
        setReviews([
          { review: reviews.reviews[0] },
          { review: reviews.reviews[1] },
          { review: reviews.reviews[2] }
        ]);
      }
    } catch (err) {
      console.error(err);
      setNetworkError(true);
    }
  };

  const handleBookmark = async () => {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      },
      body: JSON.stringify({ result: result, maps: maps })
    };
    try {
      await fetch('/api/bookmarks', req);
      setBookmarked(true);
    } catch (err) {
      console.error(err);
    }
  };

  const checkBookmark = async () => {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    };
    try {
      const res = await fetch('/api/bookmarked', req);
      const results = await res.json();
      for (let i = 0; i < results.length; i++) {
        if (results[i].businessId === result.id) {
          setBookmarked(true);
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBookmark = async () => {
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      },
      body: JSON.stringify({ businessId: result.id })
    };
    try {
      await fetch('/api/bookmark', req);
      setBookmarked(false);
    } catch (err) {
      console.error(err);
    }
  };

  const bookmarkButton = () => {
    const arrayButton = [];
    if (bookmarked) {
      arrayButton.push(<button key={1} onClick={deleteBookmark} className='bookmark-button margin-left'><i className="star-size fa-solid fa-bookmark"></i></button>);
    } else {
      arrayButton.push(<button key={1} onClick={handleBookmark} className='bookmark-button margin-left'><i className="fa-regular fa-bookmark star-size"></i></button>);
    }
    return arrayButton;
  };

  const { user } = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;
  if (networkError) {
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
  if (resultFound === true && result.name === '') {
    return <LoadingSpinner />;
  }

  if (!resultFound) {
    return <NoResultFound />;
  } else {
    return (
      <>
        <div className='row'>
          <div className='row column-one-third'>
            <div className='result-image-container row align-items-end'>
              <img src={result.image} className='result-image'></img>
            </div>
          </div>
          <div className='column-two-thirds'>
            <h4 className='roboto-font margin-top result-title-size'>{result.name}</h4>
            <div className='margin-bottom-10'>
              <Rating rating={result.rating} />
              {bookmarkButton().map(button => button)}
            </div>
            <div className='row-column-responsive'>
              <div className='column-half'>
                <p className='restaurant-info result-info-size roboto-font'>{result.location.address1}</p>
                <p className='restaurant-info result-info-size roboto-font'>{result.location.address2}</p>
                <p className='restaurant-info result-info-size roboto-font'>{result.location.city} {result.location.state} {result.location.zip_code}</p>
              </div>
              <div className='column-half'>
                <TwilioButton address={result.location} name={result.name} />
              </div>
            </div>
          </div>
        </div>
        <div className='row justify-center'>
          <MapsComponent maps={maps} />
        </div>
        <Accordion reviews={reviews} />
      </>
    );
  }
}
