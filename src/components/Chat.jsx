import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Channels from './Channels.jsx';
import {
  fetchInfo, getCurrentChannelMessages, getCurrentChannel,
} from '../store/slice.js';
import Messages from './Messages.jsx';
import FormMessage from './FormMessage.jsx';

const ChatWindow = () => {
  const { t } = useTranslation();

  const messages = useSelector(getCurrentChannelMessages);
  const currentChannel = useSelector(getCurrentChannel);

  const name = currentChannel && currentChannel.name;

  return (
    <div className="row h-100 bg-white flex-md-row">

      <Channels />

      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b>{name}</b></p>
            <span className="text-muted">{t('counts.key', { count: messages.length })}</span>
          </div>
          <Messages />
          <FormMessage />
        </div>
      </div>
    </div>
  );
};

const Chat = () => {
  const dispatch = useDispatch();
  const { fetchingState } = useSelector((state) => state.fetchingState);

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      dispatch(fetchInfo());
    }
    return () => {
      isActive = false;
    };
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {fetchingState !== 'finished' ? <Spinner animation="border" /> : <ChatWindow />}
    </div>
  );
};

export default Chat;
