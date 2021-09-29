import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, FormGroup } from 'react-bootstrap';
import Channel from './Channel.jsx';
import { setCurrentChannelId, openModal } from '../store/slice.js';
import { modalTypes } from '../constants.js';

const handleChangeChannel = (dispatch, id) => () => dispatch(setCurrentChannelId({ id }));
const handleRemoveChannel = (dispatch, id) => () => dispatch(openModal({
  type: modalTypes.removeChannel,
  id,
}));
const handleRenameChannel = (dispatch, id) => () => dispatch(openModal({
  type: modalTypes.renameChannel,
  id,
}));
const handleAddChannel = (dispatch) => () => dispatch(openModal({ type: modalTypes.addChannel }));

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <FormGroup className="d-flex justify-content-between mb-3 px-4">
        <span className="mb-0 fs-5">{t('chat.channels')}</span>
        <Button
          role="button"
          type="button"
          variant="outline-primary"
          className="py-0 btn-sm"
          onClick={handleAddChannel(dispatch)}
        >
          <span className="fs-5">+</span>
        </Button>
      </FormGroup>
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
    </div>
  );
};

export default Channels;
