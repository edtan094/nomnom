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

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path.includes('result')) {
      return <Result stars={this.props.stars}/>;
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
