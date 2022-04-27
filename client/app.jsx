import React, { useState, useEffect, useRef } from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';
import Result from './pages/result';
import Bookmarks from './pages/bookmarks';
import LandingPage from './pages/landing-page';
import BookmarkResult from './pages/bookmark-result';
import PageNotFound from './pages/page-not-found';
import parseRoute from '../lib/parseRoute';
import decodeToken from '../lib/decode-token';
import AppContext from '../lib/app-context';

// to retrieve prevState of route in App
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function App(props) {

  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const prevRoute = usePrevious(route);
  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [guestUser] = useState({
    username: 'guestUser',
    password: 'guestUser'
  });

  useEffect(() => {
    if (route !== prevRoute) {
      window.scrollTo(0, 0);
    }
  });

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setRoute(parseRoute(window.location.hash));
    });
    const token = window.localStorage.getItem('jwt');
    const user = token ? decodeToken(token) : null;
    setUser(user);
    setIsAuthorizing(false);
    return () => {
      window.removeEventListener('hashchange', () => {
        setRoute(parseRoute(window.location.hash));
      });
    };
  }, []);

  const handleSignIn = data => {
    if (data.error === 'invalid login') {
      const url = new URL(window.location);
      url.hash = '#sign-in';
      window.location.replace(url);
      return null;
    } else {
      const { user, token } = data;
      window.localStorage.setItem('jwt', token);
      setUser(user);
      const url = new URL(window.location);
      url.hash = '#';
      window.location.replace(url);
      return null;
    }
  };

  const guestSignIn = event => {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guestUser)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(data => {
        handleSignIn(data);
      })
      .catch(error => console.error(error));
  };

  const handleSignOut = event => {
    window.localStorage.removeItem('jwt');
    setUser(null);
  };

  const renderPage = () => {
    const { path } = route;
    if (path === '') {
      return <Home />;
    } else if (path === 'sign-up' || path === 'sign-in') {
      return <LandingPage guestSignIn={guestSignIn} handleSignIn={handleSignIn} />;
    } else if (path.includes('result')) {
      return <Result />;
    } else if (path === 'bookmarks') {
      return <Bookmarks />;
    } else if (path.includes('bookmark-location')) {
      return <BookmarkResult />;
    } else {
      return <PageNotFound />;
    }
  };

  const contextValue = { user };
  if (isAuthorizing) return null;
  return (
    <AppContext.Provider value={contextValue} >
      <>
        <Navbar route={route} handleSignOut={handleSignOut} />
        <PageContainer>
          {renderPage()}
        </PageContainer>
      </>
    </AppContext.Provider>
  );
}
