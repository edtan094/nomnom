import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';

export default class App extends React.Component {
  render() {
    return (
      <>
      <Navbar />
      <PageContainer>
        <Home />
      </PageContainer>
      </>
    );
  }
}
