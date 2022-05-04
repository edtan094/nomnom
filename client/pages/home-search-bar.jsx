import React, { useState, useContext } from 'react';
import Redirect from '../components/redirect';
import AppContext from '../../lib/app-context';

export default function Home(props) {
  const [preference, setPreference] = useState('');
  const [location, setLocation] = useState('');

  const handleInputPreference = event => {
    setPreference(event.target.value);
  };

  const handleInputLocation = event => {
    setLocation(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    window.location.hash = `result?term=${preference}&location=${location}`;
  };

  const { user } = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;

  return (
    <div className='row center-of-page vh-height'>
      <form onSubmit={handleSubmit} method='get' className='home-page-form'>
        <div className='row'>
          <label className='home-page-font-size padding-right'>I want to eat</label>
          <input onChange={handleInputPreference} value={preference} name='preferences' className='input-theme' placeholder='preference...' type="text" htmlFor="at" required></input>
        </div>
        <div className='row padding-top'>
          <label className='home-page-font-size padding-right'>at</label>
          <input onChange={handleInputLocation} value={location} className='input-theme' placeholder="location..." type="text" htmlFor='at' required></input>
        </div>
        <div className='row justify-end'>
          <input className='search-button pointer' type="submit" value="SEARCH"></input>
        </div>
      </form>
    </div>
  );
}
