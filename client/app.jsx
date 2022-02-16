import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';
import { parseRoute } from '../lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home-page',
      route: parseRoute(window.location.hash)
    };
  }

  render() {
    return (
      <>
      <Navbar view={this.state.view} />
      <PageContainer>
        <Home />
      </PageContainer>
      </>
    );
  }
}
