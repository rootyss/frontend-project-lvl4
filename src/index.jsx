// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import '../assets/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = configureStore({
  reducer: {},
});

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('chat')
  );