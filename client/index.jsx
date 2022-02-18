import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const stars = [
  1, 2, 3, 4, 5
];
ReactDOM.render(
  <App stars={stars}/>,
  document.querySelector('#root')
);
