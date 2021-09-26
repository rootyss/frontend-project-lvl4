// @ts-check
import Rollbar from 'rollbar';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import init from './init.jsx';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';

const start = async () => {
  const socket = io();

  const rollb = new Rollbar({
    accessToken: process.env.ROLLBAR_TOKEN1,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: process.env.NODE_ENV === 'production',
  });
  rollb.log('its worked');

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }
  const virtualDom = await init(socket);

  ReactDOM.render(virtualDom,
    document.getElementById('chat'),
  );
};

start();
// test
