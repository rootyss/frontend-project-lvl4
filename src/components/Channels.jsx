import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Channel from './Channel.jsx';
import { setCurrentChannelId, removeChannel, renameChannel } from '../store/slice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  const handleChangeChannel = (dispatch, id) => () => dispatch(setCurrentChannelId({ id }));
  const handleRemoveChannel = (dispatch, id) => () => {};
  const handleRenameChannel = (dispatch, id) => () => {};
  
  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels.map(({ name, id, removable }) => (
        <Channel
          key={id}
          name={name}
          id={id}
          removable={removable}
          isCurrentChannel={currentChannelId === id}
          handleChangeChannel={handleChangeChannel(dispatch, id)}
          handleRemoveChannel={handleRemoveChannel(dispatch, id)}
          handleRenameChannel={handleRenameChannel(dispatch, id)}
        />
      ))}
    </ul>
  );
};

export default Channels;
