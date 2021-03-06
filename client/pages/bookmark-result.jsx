import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../lib/app-context';
import Redirect from '../components/redirect';
import TwilioButton from '../components/twilio-button';
import Rating from '../components/rating';
import MapsComponent from '../components/google-maps';
import LoadingSpinner from '../components/loading-spinner';
import Accordion from '../components/accordion';
import parseRoute from '../../lib/parseRoute';

export default function BookmarkResult(props) {

  const [bookmarked, setBookmarked] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [resultFound, setResultFound] = useState(true);
  const [maps, setMaps] = useState({});
  const [reviews, setReviews] = useState([]);
  const [result, setResult] = useState({
    name: '',
    location: '',
    image: '',
    rating: null,
    id: ''
  });

  useEffect(() => {
    renderBookmark();
  }, []);

  const bookmarkButton = () => {
    const arrayButton = [];
    if (bookmarked) {
      arrayButton.push(<button key={1} onClick={deleteBookmark} className='bookmark-button margin-left'><i className="star-size fa-solid fa-bookmark"></i></button>);
    }
    return arrayButton;
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
      window.location.hash = 'bookmarks';
    } catch (err) {
      console.error(err);
    }
  };

  const renderBookmark = async () => {
    const { params } = parseRoute(window.location.hash);
    const id = params.get('businessId');
    const req = {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    };
    try {
      const res = await fetch(`/api/bookmark/${id}`, req);
      const result = await res.json();
      if (result.total === 0) {
        setResultFound(false);
      } else {
        const resReviews = await fetch(`/api/yelp/${id}`);
        const reviews = await resReviews.json();
        setResultFound(true);
        setResult({
          name: result[0].name,
          address1: result[0].address1,
          address2: result[0].address2,
          address3: result[0].address3,
          city: result[0].city,
          state: result[0].state,
          zipcode: result[0].zipcode,
          image: result[0].image,
          rating: result[0].rating,
          id: result[0].businessId
        });
        setMaps({ lat: parseFloat(result[0].latitude), lng: parseFloat(result[0].longitude) });
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
                <p className='restaurant-info result-info-size roboto-font'>{result.address1}</p>
                <p className='restaurant-info result-info-size roboto-font'>{result.address2}</p>
                <p className='restaurant-info result-info-size roboto-font'>{result.city} {result.state} {result.zipcode}</p>
              </div>
              <div className='column-half'>
                <TwilioButton address={{ display_address: [result.address1, result.address2, result.address3, result.city, result.state, result.zipcode] }
                }
                  name={result.name} />
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
