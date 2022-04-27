import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../lib/app-context';
import Redirect from '../components/redirect';
import Rating from '../components/rating';
import LoadingSpinner from '../components/loading-spinner';

export default function Bookmarks(props) {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksLoaded, setBookmarksLoaded] = useState(false);

  useEffect(() => {
    getBookmarks();
  }, []);

  const getBookmarks = async () => {
    const req = {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    };
    try {
      const res = await fetch('/api/bookmarks', req);
      const result = await res.json();
      setBookmarks(result);
      setBookmarksLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  const visitBookmark = (event, businessId) => {
    event.preventDefault();
    window.location.hash = `bookmark-location?businessId=${event.target.closest('.bookmark-result').id}`;
  };
  const { user } = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;
  if (bookmarksLoaded === false) {
    return <LoadingSpinner />;
  }
  if (bookmarks[0] === undefined) {
    return (
      <>
        <div className='row justify-center'>
          <p className='font-size-30'>No Bookmarks Found!</p>
        </div>
        <div className='row justify-center'>
          <img className='sad-cookie-image' src='./images/sad-cookie-image.jpg'></img>
        </div>
      </>
    );
  }

  return (
    <div className='row'>
      {bookmarks.map(business => {
        return (
          <div key={business.businessId} id={business.businessId} className='column-half-responsive padding-top bookmark-result'>
            <button onClick={visitBookmark} className='row border-radius bookmark align-center'>
              <div className='column-half-nonresponsive'>
                <p className='roboto-font result-info-size text-align-initial'>{business.name}</p>
                <div className='text-align-initial'><Rating rating={business.rating} /></div>
                <p className='roboto-font result-info-size text-align-initial margin-bottom-0'>{business.address1}</p>
                {business.address2 && <p className='roboto-font result-info-size text-align-initial restaurant-info'>{business.address2}</p>}
                <p className='roboto-font result-info-size text-align-initial restaurant-info'>{business.city} {business.state} {business.zipcode}</p>
              </div>
              <div className='column-half-nonresponsive'>
                <img className='bookmark-image' src={business.image}></img>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
