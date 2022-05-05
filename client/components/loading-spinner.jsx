import React from 'react';

export default function LoadingSpinner(props) {
  return (
    <>
      <div className='row justify-center margin-top'>
        <p className='font-size-30'>NomNom is picking...</p>
      </div>
      <div className='row justify-center margin-top'>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
      <div className='row justify-center margin-top'>
        <img className='sad-cookie-image' src='./images/magnifying-glass-cartoon.jpg'></img>
      </div>
    </>
  );
}
