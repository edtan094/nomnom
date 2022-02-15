import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <header className="purple-background shadow">
        <div className="container navbar row align-center">
            <div className="column-full">
              <div className="row white-text justify-space-between">
              <div className='row align-center'>
                <a className='font-theme heading padding-right'>NomNom</a>
                <img className='logo' src='./images/chocolate-chip-cookie-biscuits-clip-art-cookies-removebg-preview.png'></img>
              </div>
                <div className="row justify-end align-center">
                  <a className='padding-right font-theme'>Home</a>
                  <a className='font-theme'>Try Again</a>
                </div>
              </div>
            </div>
        </div>
      </header>
    );
  }
}
