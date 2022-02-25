import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';
import Result from './pages/result';
import LandingPage from './pages/landing-page';
import PageNotFound from './pages/page-not-found';
import { parseRoute } from '../lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null,
      signedIn: false
    };
    this.guestSignIn = this.guestSignIn.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.route !== prevState.route) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  guestSignIn(event) {
    event.preventDefault();
    this.setState({ signedIn: true });
    const url = new URL(window.location);
    url.hash = '#';
    window.location.replace(url);
    return null;

  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home signedIn={this.state.signedIn}/>;
    } else if (path === 'sign-up' || path === 'sign-in') {
      return <LandingPage guestSignIn={this.guestSignIn}/>;
    } else if (path.includes('result')) {
      return <Result signedIn={this.state.signedIn}/>;
    } else {
      return <PageNotFound />;
    }
  }

  render() {
    return (
      <>
      <Navbar route={this.state.route}/>
      <PageContainer>
        {this.renderPage()}
      </PageContainer>
      </>
    );
  }
}
