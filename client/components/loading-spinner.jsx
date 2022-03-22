import React from 'react';

export default function LoadingSpinner(props) {
  return (
    <div className='row justify-center margin-top'>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}
