// @ts-check
import Rollbar from 'rollbar';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import init from './init.jsx';

const start = () => {
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
  init();
};
start();
// test
