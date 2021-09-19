import React from 'react';
import { useSelector } from 'react-redux';
import Channel from './Channel.jsx';

const Channels = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels.map(({ name, id, removable }) => (
        <Channel
          key={id}
          name={name}
          id={id}
          removable={removable}
          isCurrentChannel={currentChannelId === id}
        />
      ))}
    </ul>
  );
};

export default Channels;
