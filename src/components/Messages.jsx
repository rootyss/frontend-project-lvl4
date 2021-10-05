import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const messageSelector = (state) => state.messagesInfo.messages;
const currentChannelIdSelector = (state) => state.channelsInfo.currentChannelId;

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const Messages = () => {
  const messages = useSelector(messageSelector);
  const currentChannelId = useSelector(currentChannelIdSelector);
  if (messages.length === 0) return null;

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
      <AlwaysScrollToBottom />
    </div>
  );
};

export default Messages;
