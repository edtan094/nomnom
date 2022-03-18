import React from 'react';

export default function Rating(props) {
  const rating = props.rating;
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
  return arrayStars.map(rating => rating);
}
