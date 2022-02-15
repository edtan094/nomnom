import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className='container'>
          <a className='navbar-brand brand-font'>
            NomNom
          </a>
        </div>
      </nav>
    );
  }
}
