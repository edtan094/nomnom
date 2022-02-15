import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <header className="purple-background shadow">
        <div className="container navbar row align-center">
            <div className="column-full">
              <div className="row white-text justify-space-between">
                <a className='font-theme heading'>NomNom</a>
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
