import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';
import Result from './pages/result';
import LandingPage from './pages/landing-page';
import PageNotFound from './pages/page-not-found';
import parseRoute from '../lib/parseRoute';
import decodeToken from '../lib/decode-token';
import AppContext from '../lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null,
      isAuthorizing: true,
      guestUser: {
        username: 'guestUser',
        password: 'guestUser'
      }
    };
    this.guestSignIn = this.guestSignIn.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
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
    const token = window.localStorage.getItem('jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(data) {
    if (data.error === 'invalid login') {
      const url = new URL(window.location);
      url.hash = '#sign-in';
      window.location.replace(url);
      return null;
    } else {
      const { user, token } = data;
      window.localStorage.setItem('jwt', token);
      this.setState({ user, signedIn: true });
      const url = new URL(window.location);
      url.hash = '#';
      window.location.replace(url);
      return null;
    }
  }

  guestSignIn(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.guestUser)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(data => {
        this.handleSignIn(data);
      })
      .catch(error => console.error(error));
  }

  handleSignOut(event) {
    window.localStorage.removeItem('jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home signedIn={this.state.signedIn}/>;
    } else if (path === 'sign-up' || path === 'sign-in') {
      return <LandingPage guestSignIn={this.guestSignIn} handleSignIn={this.handleSignIn}/>;
    } else if (path.includes('result')) {
      return <Result />;
    } else {
      return <PageNotFound />;
    }
  }

  render() {
    const { user } = this.state;
    const contextValue = { user };
    if (this.state.isAuthorizing) return null;
    return (
      <AppContext.Provider value={contextValue} >
        <>
        <Navbar route={this.state.route} handleSignOut={this.handleSignOut}/>
        <PageContainer>
          {this.renderPage()}
        </PageContainer>
        </>
      </AppContext.Provider>
    );
  }
}
