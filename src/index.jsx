// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import store from './store';
import { io } from "socket.io-client";
import apiContext from './context/apiContext.jsx';
import useAPI from './hooks/useAPI.jsx';
import { addMessage } from './store/slice.js';
import { useDispatch } from 'react-redux';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
};

const APIProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();

socket.on('newMessage', (data) => {
  dispatch(addMessage({ messageData: data }))
});

  return (
    <apiContext.Provider value={{ socket }}>
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
