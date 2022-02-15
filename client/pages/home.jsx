import React from 'react';

export default function Home(props) {
  return (
    <>
      <div className="container">
        <div className="row align-items-start">
          <div className="col">
            One of three columns
          </div>
          <div className="col">
            One of three columns
          </div>
          <div className="col">
            One of three columns
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col">
            One of three columns
          </div>
          <div className="col">
            One of three columns
          </div>
          <div className="col">
            One of three columns
          </div>
        </div>
        <div className="row align-items-end">
          <div className="col">
            One of three columns
          </div>
          <div className="col">
            One of three columns
          </div>
          <div className="col">
            One of three columns
          </div>
        </div>
      </div>
    </>
  );
}
