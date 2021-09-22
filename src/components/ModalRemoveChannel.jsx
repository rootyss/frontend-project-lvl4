import React from 'react';
import { useFormik } from 'formik';
import {
  Button, FormGroup, Modal, Spinner,
} from 'react-bootstrap';
import useAPI from '../hooks/useAPI.jsx';

const ModalRemoveChannel = ({ close, channelId }) => {
  const { api: { removeChannel } } = useAPI();

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
        <Modal.Title>Удаление канала</Modal.Title>
        <Button
          aria-label="Close"
          variant="secondary"
          className="btn btn-close"
          onClick={close}
        />
      </Modal.Header>
      <Modal.Body className="text-danger">
        <p><b>Вы уверены?</b></p>
        <FormGroup className="text-danger">{formik.errors.channelInfo}</FormGroup>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button
          type="cancel"
          variant="secondary"
          onClick={close}
          disabled={formik.isSubmitting}
        >
          Отмена
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
          ) : 'Удалить'}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalRemoveChannel;
