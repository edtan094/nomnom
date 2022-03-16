import React from 'react';
import AppContext from '../../lib/app-context';
import Redirect from '../components/redirect';

export default class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookmarks: { rating: 3 } };
    this.getBookmarks = this.getBookmarks.bind(this);
    this.renderStars = this.renderStars.bind(this);
  }

  componentDidMount() {
    // this.getBookmarks();
  }

  renderStars() {
    const rating = this.state.bookmarks.rating;
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

  getBookmarks() {
    const req = {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    };
    fetch('/api/bookmarks', req)
      .then(res => res.json())
      .then(result => this.setState({ bookmarks: result }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    return (
      <div className='row justify-center'>
        <div className='column-half-responsive padding-top'>
          <button className='row border-radius bookmark'>
            <div className='column-two-thirds-nonresponsive'>
              <p className='roboto-font result-info-size text-align-initial'>Hiro Nori</p>
              <div className='text-align-initial'>{this.renderStars()}</div>
              <p className='roboto-font result-info-size text-align-initial'>2222 Michelson Dr<br></br>
                Ste 234,<br></br>
                Irvine, CA 92612</p>
            </div>
            <div className='column-one-third-nonresponsive'>
              <img className='bookmark-image' src='https://s3-media2.fl.yelpcdn.com/bphoto/zMlMh3bufK9prGSZMrFowQ/o.jpg'></img>
            </div>
          </button>
        </div>
        <div className='column-half-responsive padding-top'>
          <button className='row border-radius bookmark'>
            <div className='column-two-thirds-nonresponsive'>
              <p className='roboto-font result-info-size text-align-initial'>Hiro Nori</p>
              <div className='text-align-initial'>{this.renderStars()}</div>
              <p className='roboto-font result-info-size text-align-initial'>2222 Michelson Dr<br></br>
                Ste 234,<br></br>
                Irvine, CA 92612</p>
            </div>
            <div className='column-one-third-nonresponsive'>
              <img className='bookmark-image' src='https://s3-media2.fl.yelpcdn.com/bphoto/zMlMh3bufK9prGSZMrFowQ/o.jpg'></img>
            </div>
          </button>
        </div>
        <div className='column-half-responsive padding-top'>
          <button className='row border-radius bookmark'>
            <div className='column-two-thirds-nonresponsive'>
              <p className='roboto-font result-info-size text-align-initial'>Hiro Nori</p>
              <div className='text-align-initial'>{this.renderStars()}</div>
              <p className='roboto-font result-info-size text-align-initial'>2222 Michelson Dr<br></br>
                Ste 234,<br></br>
                Irvine, CA 92612</p>
            </div>
            <div className='column-one-third-nonresponsive'>
              <img className='bookmark-image' src='https://s3-media2.fl.yelpcdn.com/bphoto/zMlMh3bufK9prGSZMrFowQ/o.jpg'></img>
            </div>
          </button>
        </div>
        <div className='column-half-responsive padding-top'>
          <button className='row border-radius bookmark'>
            <div className='column-two-thirds-nonresponsive'>
              <p className='roboto-font result-info-size text-align-initial'>Hiro Nori</p>
              <div className='text-align-initial'>{this.renderStars()}</div>
              <p className='roboto-font result-info-size text-align-initial'>2222 Michelson Dr<br></br>
                Ste 234,<br></br>
                Irvine, CA 92612</p>
            </div>
            <div className='column-one-third-nonresponsive'>
              <img className='bookmark-image' src='https://s3-media2.fl.yelpcdn.com/bphoto/zMlMh3bufK9prGSZMrFowQ/o.jpg'></img>
            </div>
          </button>
        </div>
      </div>
    );
  }
}
Bookmarks.contextType = AppContext;
