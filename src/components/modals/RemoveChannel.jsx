import React from 'react';
import { useFormik } from 'formik';
import {
  Button, FormGroup, Modal, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useAPI from '../../hooks/useAPI.jsx';
import { getChannelId } from '../../store/modalSlice.js';

const ModalRemoveChannel = ({ close }) => {
  const { api: { removeChannel } } = useAPI();
  const { t } = useTranslation();
  const channelId = useSelector(getChannelId);

  const formik = useFormik({
    initialValues: { channelInfo: '' },
    onSubmit: async () => {
      const id = channelId;
      try {
        await removeChannel({ id });
        close();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
        <Button
          aria-label="Close"
          variant="secondary"
          className="btn btn-close"
          onClick={close}
        />
      </Modal.Header>
      <Modal.Body className="text-danger">
        <p><b>{t('modalRemoveChannel.confirm')}</b></p>
        <FormGroup className="text-danger">{formik.errors.channelInfo}</FormGroup>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button
          role="button"
          type="cancel"
          variant="secondary"
          onClick={close}
          disabled={formik.isSubmitting}
        >
          {t('buttons.cancel')}
        </Button>
        <Button
          role="button"
          type="submit"
          variant="danger"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <>
              <Spinner animation="border" size="sm" role="status" />
            </>
          ) : t('buttons.remove')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalRemoveChannel;
