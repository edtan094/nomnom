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
          <select className='select-theme pointer' onChange={handleInputPreference} value={preference} name='preferences' required>
            <option value="">Select a Value</option>
            <option value="no preference">No preference</option>
            <option value="tradamerican">American</option>
            <option value="brazilian">Brazilian</option>
            <option value="breakfast_brunch">Brunch</option>
            <option value="burgers">Burgers</option>
            <option value="cafes">Cafes</option>
            <option value="chicken_wings">Chicken Wings</option>
            <option value="chinese">Chinese</option>
            <option value="comfortfood">Comfort Food</option>
            <option value="desserts">Dessert</option>
            <option value="hotdogs">Fast Food</option>
            <option value="filipino">Filipino</option>
            <option value="fishnchips">Fish & Chips</option>
            <option value="french">French</option>
            <option value="gastropubs">Gastropubs</option>
            <option value="german">German</option>
            <option value="greek">Greek</option>
            <option value="halal">Halal</option>
            <option value="hawaiian">Hawaiian</option>
            <option value="hkcafe">Hong Kong Style Cafe</option>
            <option value="hotpot">Hot Pot</option>
            <option value="indpak">Indian</option>
            <option value="irish">Irish</option>
            <option value="italian">Italian</option>
            <option value="japanese">Japanese</option>
            <option value="korean">Korean</option>
            <option value="latin">Latin American</option>
            <option value="malaysian">Malaysian</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="mexican">Mexican</option>
            <option value="mideastern">Middle Eastern</option>
            <option value="noodles">Noodles</option>
            <option value="pakistani">Pakistani</option>
            <option value="persian">Persian/Iranian</option>
            <option value="peruvian">Peruvian</option>
            <option value="pizza">Pizza</option>
            <option value="polish">Polish</option>
            <option value="portuguese">Portuguese</option>
            <option value="poutineries">Poutineries</option>
            <option value="russian">Russian</option>
            <option value="salad">Salad</option>
            <option value="sandwiches">Sandwiches</option>
            <option value="singaporean">Singaporean</option>
            <option value="soup">Soup</option>
            <option value="spanish">Spanish</option>
            <option value="steak">SteakHouses</option>
            <option value="sushi">Sushi Bars</option>
            <option value="taiwanese">Taiwanese</option>
            <option value="tapasmallplates">Tapas/Small Plates</option>
            <option value="thai">Thai</option>
            <option value="turkish">Turkish</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vietnamese">Vietnamese</option>
            <option value="waffles">Waffles</option>
          </select>
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
