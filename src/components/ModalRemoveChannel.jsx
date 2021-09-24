import React from 'react';
import { useFormik } from 'formik';
import {
  Button, FormGroup, Modal, Spinner,
} from 'react-bootstrap';
import useAPI from '../hooks/useAPI.jsx';
import { useTranslation } from 'react-i18next';

const ModalRemoveChannel = ({ close, channelId }) => {
  const { api: { removeChannel } } = useAPI();
  const { t } = useTranslation();

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
          type="cancel"
          variant="secondary"
          onClick={close}
          disabled={formik.isSubmitting}
        >
          {t('buttons.cancel')}
        </Button>
        <Button
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
