// @ts-check
import Rollbar from 'rollbar';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import init from './init.jsx';

const rollbarProject = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: process.env.NODE_ENV === 'production',
});

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
//test
init();
