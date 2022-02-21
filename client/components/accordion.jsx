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
      <div className='row justify-center accordion-padding-top'>
        <div className='row direction-column width-accordion'>
          {this.props.reviews.map((reviews, index) => {
            const handleClick = () => this.setOpenReview(index);
            return (
              <div key={index}>
                <div onClick={handleClick} className={index === this.state.openReview ? 'row justify-space-between align-center' : 'row justify-space-between border-bottom align-center' }><h4 className="roboto-font">{reviews.review.user.name}</h4>
                  {index === this.state.openReview ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>}</div>
                <div className={index === this.state.openReview ? 'border-bottom' : ''}>
                  {index === this.state.openReview && <div className='row'>
                    <div><img className='review-image' src={reviews.review.user.image_url}></img></div><span className='roboto-font'>{reviews.review.text}</span>
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
