import React, { useState, useContext, useEffect } from 'react';
import Redirect from '../components/redirect';
import AppContext from '../../lib/app-context';

export default function Home(props) {
  const [preference, setPreference] = useState('');
  const [location, setLocation] = useState('');
  const [autocomplete, setAutocomplete] = useState([]);

  const handleInputPreference = event => {
    setPreference(event.target.value);
  };

  const handleInputLocation = event => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    const fetchAutocomplete = async () => {
      if (preference !== '') {
        try {
          const res = await fetch(`/api/yelp/autocomplete/${preference}`);
          const result = await res.json();
          setAutocomplete(result);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchAutocomplete();
  }, [preference]);

  const handleAutocompleteButton = text => {
    setPreference(text);
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
        <div className='row'>
            {preference !== ''
              ? <ul className='autocomplete-container responsive-margin-left'> {autocomplete.map(autocomplete => <li key={autocomplete.text}><button onClick={() => handleAutocompleteButton(autocomplete.text)} className='autocomplete autocomplete-text'>{autocomplete.text}</button></li>)}</ul>
              : null}
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
