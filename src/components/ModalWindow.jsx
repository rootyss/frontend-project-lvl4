import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChannels, getChannelsNames, closeModal, getChannelId, getModalInfo,
} from '../store/slice.js';

import ModalCreateChannel from './ModalCreateChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';

const modals = {
  addChannel: ModalCreateChannel,
  renameChannel: ModalRenameChannel,
  removeChannel: ModalRemoveChannel,
};

const ModalWindow = () => {
  const dispatch = useDispatch();
  const modalInfo = useSelector(getModalInfo);
  const channelId = useSelector(getChannelId);
  const channels = useSelector(getChannels);
  const channelsNames = useSelector(getChannelsNames);

  const { type, isOpen } = modalInfo;
  const close = () => dispatch(closeModal());

  if (!type) {
    return null;
  }

  const ModalComponent = modals[type];

  return (
    <Modal show={isOpen} onHide={close}>
      <ModalComponent
        close={close}
        channels={channels}
        channelId={channelId}
        channelsNames={channelsNames}
        dispatch={dispatch}
      />
    </Modal>
  );
};

export default ModalWindow;
