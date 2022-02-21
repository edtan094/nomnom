import React from 'react';

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openReview: null
    };
  }

  setOpenReview(index) {
    if (this.state.openReview === index) {
      this.setState({ openReview: null });
    } else {
      this.setState({ openReview: index });
    }
  }

  render() {
    return (
      <div className='row justify-center'>
        <div className='row direction-column width-accordion'>
          {this.props.reviews.map((reviews, index) => {
            const handleClick = () => this.setOpenReview(index);
            return (
              <div key={index}>
                <div onClick={handleClick} className="row justify-space-between border-bottom">{reviews.review.user.name}
                <i className="fa-solid fa-caret-down"></i></div>
                  <div>
                  {index === this.state.openReview && <div className='row'>
                    <div><img className='review-image' src={reviews.review.user.image_url}></img></div>{reviews.review.text}
                    </div>}
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
