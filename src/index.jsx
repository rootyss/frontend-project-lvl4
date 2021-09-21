// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { Provider, useDispatch } from 'react-redux';
import '../assets/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import App from './App.jsx';
import store from './store';
import apiContext from './context/apiContext.jsx';
import { addMessage } from './store/slice.js';
import actions from './apiConstants.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const APIProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();

  const emitAcknowledgement = (action) => (data) => new Promise((response, reject) => {
    const timer = setTimeout(() => reject(new Error('error connect')), 1000);
    socket.volatile.emit(action, data, (resp) => {
      if (resp.status === 'ok') {
        clearTimeout(timer);
        response(resp);
      }
    });
  });

  const api = {
    sendMessage: emitAcknowledgement(actions.newMessage),
  };

  socket.on('newMessage', (data) => {
    dispatch(addMessage({ messageData: data }));
  });

  return (
    <apiContext.Provider value={{ api }}>
      {children}
    </apiContext.Provider>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <APIProvider>
      <App />
    </APIProvider>
  </Provider>,
  document.getElementById('chat'),
);
