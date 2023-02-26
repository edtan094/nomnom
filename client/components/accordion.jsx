import React, { useState } from 'react';

export default function Accordion(props) {
  const [openReview, setOpenReview] = useState(null);

  const setIndex = index => {
    if (openReview === index) {
      setOpenReview(null);
    } else {
      setOpenReview(index);
    }
  };

  return (
    <div className='row justify-center accordion-padding-top padding-bottom-100'>
      <div className='row direction-column width-accordion'>
        {props.reviews.map((review, index) => {
          const handleClick = () => setIndex(index);
          return (
            <div key={index} className="pointer">
              <div onClick={handleClick} className={index === openReview ? 'row justify-space-between align-center' : 'row justify-space-between border-bottom align-center'}><h4 className="roboto-font">{review.user.name}</h4>
                {index === openReview ? <i className="fa-solid fa-caret-up pointer"></i> : <i className="fa-solid fa-caret-down pointer"></i>}</div>
              <div className={index === openReview ? 'border-bottom' : ''}>
                {index === openReview && <div className='row padding-bottom'>
                  <div><img className='review-image' src={review.user.image_url}></img></div><span className='roboto-font'>{review.text}</span>
                </div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
