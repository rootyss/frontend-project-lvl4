// @ts-check
import Rollbar from 'rollbar';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import init from './init.jsx';

const rollbarProject = new Rollbar({
  accessToken: '89c75f10a43e459ca2394ce3e679ee74',
  captureUncaught: true,
  captureUnhandledRejections: true,
});


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init();
