// @ts-check
import Rollbar from 'rollbar';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import init from './init.jsx';

const rollbarProject = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init();
