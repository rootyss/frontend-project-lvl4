// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { Provider } from 'react-redux'
import '../assets/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import store from './store/';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('chat')
  );