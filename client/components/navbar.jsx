import React from 'react';
import Drawer from './drawer';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
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
                {this.props.route.path.includes('result')
                  ? <button onClick={() => window.location.reload()}
                    className='padding-right font-theme purple-background no-borders white-text font-size-16 pointer'>Try Again</button>
                  : null}
                {this.props.route.path === '' || this.props.route.path.includes('result') || this.props.route.path.includes('bookmark')
                  ? <button onClick={this.toggleOpen}
                    className='padding-right font-theme purple-background no-borders white-text font-size-16 pointer'><i className="fa-solid fa-bars"></i></button>
                  : null}
              </div>
            </div>
          </div>
        </div>
        <Drawer handleSignOut={this.props.handleSignOut} isOpen={this.state.isOpen} toggleOpen={this.toggleOpen}/>
      </header>
    );
  }

}
