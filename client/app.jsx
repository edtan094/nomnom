import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';
import Result from './pages/result';
import { parseRoute } from '../lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path.includes('result')) {
      return <Result />;
    }
  }

  render() {
    return (
      <>
      <Navbar route={this.state.route} renderPage={this.renderPage}/>
      <PageContainer>
        {this.renderPage()}
      </PageContainer>
      </>
    );
  }
}
