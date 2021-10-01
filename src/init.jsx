import { Provider } from 'react-redux';
import '../assets/application.scss';
import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App.jsx';
import store from './store';
import apiContext from './context/apiContext.js';
import { addMessage } from './store/messagesInfoSlice.js';
import { addChannel, removeChannel, renameChannel } from './store/channelsInfoSlice.js';
import { api as actions } from './constants.js';
import resources from './locales/index.js';

export default async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const withAcknowledgement = (socketFunc) => (...args) => new Promise((response, reject) => {
    // eslint-disable-next-line functional/no-let
    let called = false;
    const timer = setTimeout(() => {
      if (called) return;
      reject(new Error('error connect'));
    }, 1000);
    socketFunc(...args, (resp) => {
      if (resp.status === 'ok') {
        called = true;
        clearTimeout(timer);
        response(resp);
      }
    });
  });

  const api = {
    sendMessage: withAcknowledgement((...args) => socket.volatile.emit(actions.newMessage, ...args)), // eslint-disable-line max-len
    addChannel: withAcknowledgement((...args) => socket.volatile.emit(actions.addChannel, ...args)),
    removeChannel: withAcknowledgement((...args) => socket.volatile.emit(actions.removeChannel, ...args)), // eslint-disable-line max-len
    renameChannel: withAcknowledgement((...args) => socket.volatile.emit(actions.renameChannel, ...args)), // eslint-disable-line max-len
  };

  socket.on(actions.newMessage, (data) => {
    store.dispatch(addMessage({ messageData: data }));
  });
  socket.on(actions.addChannel, (data) => {
    store.dispatch(addChannel({ channelData: data }));
  });
  socket.on(actions.removeChannel, (data) => {
    store.dispatch(removeChannel({ channelId: data.id }));
  });
  socket.on(actions.renameChannel, (data) => {
    const { id, name } = data;
    store.dispatch(renameChannel({ channelId: id, channelName: name }));
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <apiContext.Provider value={{ api }}>
          <App />
        </apiContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};
