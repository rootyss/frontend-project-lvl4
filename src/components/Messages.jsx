import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => state.messagesInfo.messages);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

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
    </div>
  );
};

export default Messages;
