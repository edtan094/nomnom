import React from 'react';

export default function Home(props) {
  return (
    <div className='row center-of-page vh-height'>
      <form method='get' className='home-page-form'>
        <div className='row'>
          <label className='font-theme home-page-font-size padding-right'>I want to eat</label>
          <input className='input-params' placeholder='          type of food...' type="text" htmlFor='eat' id='eat' required></input>
        </div>
        <div className='row padding-top'>
          <label className='font-theme home-page-font-size padding-right'>at</label>
          <input className='input-params' placeholder="          city name..." type="text" htmlFor='at' id='at' required></input>
        </div>
        <div className='row justify-end'>
          <input className='search-button' type="submit" value="SEARCH"></input>
        </div>
      </form>
    </div>
  );
}
