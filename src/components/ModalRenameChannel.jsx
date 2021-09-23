import React, { useEffect, useRef } from 'react';
import {
  Modal, Button, Form, FormControl, InputGroup, Spinner,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useAPI from '../hooks/useAPI.jsx';

const ModalCreateChannel = ({
  close, channelId, channels, channelsNames,
}) => {
  const { name } = channels.find((channel) => channel.id === channelId);

  const { api: { renameChannel } } = useAPI();

  const formik = useFormik({
    initialValues: {
      newChannelName: name,
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      newChannelName: Yup.string().trim()
        .notOneOf(channelsNames, 'Должно быть уникальным')
        .required(),
    }),
    onSubmit: async (values) => {
      const channelName = values.newChannelName.trim();
      try {
        await renameChannel({ name: channelName, id: channelId });
        close();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const textInput = useRef(null);
  useEffect(() => {
    textInput.current.select();
  }, [textInput]);

  return (
    <>
      <Modal.Header>
        <Modal.Title>Переименовать канал</Modal.Title>
        <Button
          aria-label="Close"
          variant="secondary"
          className="btn btn-close"
          onClick={close}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup noValidate className="mt-auto">
            <FormControl
              ref={textInput}
              name="newChannelName"
              required
              maxLength={20}
              value={formik.values.newChannelName}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.newChannelName}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.newChannelName}</Form.Control.Feedback>
          </InputGroup>
        </Form>
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
          variant="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <>
              <Spinner animation="border" size="sm" role="status" />
            </>
          ) : 'Отправить'}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalCreateChannel;