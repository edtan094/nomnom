import React from 'react';

export default function Navbar(props) {
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
                  <a href='' className='padding-right font-theme'>Home</a>
                {props.route.path === '' ? null : <a className='font-theme'>Try Again</a>}
                </div>
              </div>
            </div>
        </div>
      </header>
  );
}
