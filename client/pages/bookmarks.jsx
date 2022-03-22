import React from 'react';
import AppContext from '../../lib/app-context';
import Redirect from '../components/redirect';
import Rating from '../components/rating';
import LoadingSpinner from '../components/loading-spinner';

export default class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookmarks: [], bookmarksLoaded: false };
    this.getBookmarks = this.getBookmarks.bind(this);
    this.visitBookmark = this.visitBookmark.bind(this);
  }

  componentDidMount() {
    this.getBookmarks();
  }

  getBookmarks() {
    const req = {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    };
    fetch('/api/bookmarks', req)
      .then(res => res.json())
      .then(result => this.setState({ bookmarks: result, bookmarksLoaded: true }))
      .catch(err => console.error(err));
  }

  visitBookmark(event, businessId) {
    event.preventDefault();
    window.location.hash = `bookmark-location?businessId=${event.target.closest('.bookmark-result').id}`;
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    if (this.state.bookmarksLoaded === false) {
      return <LoadingSpinner />;
    }
    if (this.state.bookmarks[0] === undefined) {
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
        {this.state.bookmarks.map(business => {
          return (
            <div key={business.businessId} id={business.businessId} className='column-half-responsive padding-top bookmark-result'>
              <button onClick={this.visitBookmark} className='row border-radius bookmark align-center'>
                <div className='column-two-thirds-nonresponsive'>
                  <p className='roboto-font result-info-size text-align-initial'>{business.name}</p>
                  <div className='text-align-initial'><Rating rating={business.rating}/></div>
                  <p className='roboto-font result-info-size text-align-initial margin-bottom-0'>{business.address1}</p>
                  {business.address2 && <p className='roboto-font result-info-size text-align-initial restaurant-info'>{business.address2}</p>}
                  <p className='roboto-font result-info-size text-align-initial restaurant-info'>{business.city} {business.state} {business.zipcode}</p>
                </div>
                <div className='column-one-third-nonresponsive'>
                  <img className='bookmark-image' src={business.image}></img>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
Bookmarks.contextType = AppContext;
