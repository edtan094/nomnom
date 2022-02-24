import React from 'react';

export default function PageNotFound(props) {
  return (
    <>
      <div className='row justify-center'>
        <p className='font-theme no-result-font-size'>Oops! We could not find the
        <br></br>
        page you were looking for!
        </p>
      </div>
      <div className='row justify-center'>
        <img className='sad-cookie-image' src='./images/sad-cookie-image.jpg'></img>
      </div>
    </>
  );
}
