import React, { useState } from 'react';
import Drawer from './drawer';

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="purple-background shadow">
      <div className="container navbar row align-center">
        <div className="column-full">
          <div className="row white-text justify-space-between">
            <div className='row align-center'>
              <a href='#' className='heading padding-right'>NomNom</a>
              <img className='logo' src='./images/chocolate-chip-cookie-biscuits-clip-art-cookies-removebg-preview.png'></img>
            </div>
            <div className="row justify-end align-center">
              {props.route.path.includes('result')
                ? <button onClick={() => window.location.reload()}
                  className='padding-right font-theme purple-background no-borders white-text font-size-16 pointer'>Try Again</button>
                : null}
              {props.route.path === '' || props.route.path.includes('result') || props.route.path.includes('bookmark')
                ? <button onClick={toggleOpen}
                  className='padding-right font-theme purple-background no-borders white-text font-size-16 pointer'><i className="fa-solid fa-bars"></i></button>
                : null}
            </div>
          </div>
        </div>
      </div>
      <Drawer handleSignOut={props.handleSignOut} isOpen={isOpen} toggleOpen={toggleOpen} />
    </header>
  );
}
