import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messagesEnd = useRef(null);
  const messages = useSelector((state) => state.messagesInfo.messages);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  if (messages.length === 0) return null;

  const scrollToBottom = () => {
    if (!messagesEnd) {
      return;
    }
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.filter((message) => message.channelId === currentChannelId)
        .map(({ username, body, id }) => (
          <div key={id} className="text-break mb-2">
            <b>
              {username}
              :
              {' '}
            </b>
            {body}
          </div>
        ))}
      <div ref={messagesEnd} />
    </div>
  );
};

export default Messages;
