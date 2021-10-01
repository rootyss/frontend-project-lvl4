import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getModalInfo } from '../../store/modalSlice.js';

import ModalCreateChannel from './CreateChannel.jsx';
import ModalRenameChannel from './RenameChannel.jsx';
import ModalRemoveChannel from './RemoveChannel.jsx';

const modals = {
  addChannel: ModalCreateChannel,
  renameChannel: ModalRenameChannel,
  removeChannel: ModalRemoveChannel,
};

const ModalWindow = () => {
  const dispatch = useDispatch();
  const modalInfo = useSelector(getModalInfo);

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
      />
    </Modal>
  );
};

export default ModalWindow;
