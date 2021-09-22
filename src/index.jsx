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
import {
  addMessage, addChannel, removeChannel, renameChannel,
} from './store/slice.js';
import { api as actions } from './constants.js';

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
    addChannel: emitAcknowledgement(actions.addChannel),
    removeChannel: emitAcknowledgement(actions.removeChannel),
    renameChannel: emitAcknowledgement(actions.renameChannel),
  };

  socket.on(actions.newMessage, (data) => {
    dispatch(addMessage({ messageData: data }));
  });
  socket.on(actions.addChannel, (data) => {
    dispatch(addChannel({ channelData: data }));
  });
  socket.on(actions.removeChannel, (data) => {
    dispatch(removeChannel({ channelId: data.id }));
  });
  socket.on(actions.renameChannel, (data) => {
    const { id, name } = data;
    dispatch(renameChannel({ channelId: id, channelName: name }));
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
