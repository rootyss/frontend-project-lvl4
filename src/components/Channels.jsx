import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, FormGroup } from 'react-bootstrap';
import ChannelBox from './ChannelBox.jsx';
import { openModal } from '../store/modalSlice.js';
import { modalTypes } from '../constants.js';
import { setCurrentChannelId } from '../store/channelsInfoSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  const handleChangeChannel = (id) => () => dispatch(setCurrentChannelId({ id }));
  const handleRemoveChannel = (id) => () => dispatch(openModal({
    type: modalTypes.removeChannel,
    id,
  }));
  const handleRenameChannel = (id) => () => dispatch(openModal({
    type: modalTypes.renameChannel,
    id,
  }));
  const handleAddChannel = () => () => dispatch(openModal({ type: modalTypes.addChannel }));

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <FormGroup className="d-flex justify-content-between mb-3 px-4">
        <span className="mb-0 fs-5">{t('chat.channels')}</span>
        <Button
          role="button"
          type="button"
          variant="outline-primary"
          className="py-0 btn-sm"
          onClick={handleAddChannel()}
        >
          <span className="fs-5">+</span>
        </Button>
      </FormGroup>
      <ul className="nav flex-column nav-pills nav-fill px-2 d-block">
        {channels.map(({ name, id, removable }) => (
          <ChannelBox
            key={id}
            name={name}
            id={id}
            removable={removable}
            isCurrentChannel={currentChannelId === id}
            handleChangeChannel={handleChangeChannel(id)}
            handleRemoveChannel={handleRemoveChannel(id)}
            handleRenameChannel={handleRenameChannel(id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Channels;
