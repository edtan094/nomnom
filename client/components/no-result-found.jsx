import React from 'react';

export default function NoResultFound(props) {
  return (
    <>
    <div className='row justify-center'>
        <p className='font-theme no-result-font-size'>No Results Found. Please Visit
        <br></br>
        The Home Page To Try Again.
      </p>
    </div>
    <div className='row justify-center'>
      <img className='sad-cookie-image' src='./images/sad-cookie-image.jpg'></img>
    </div>
    </>
  );
}
