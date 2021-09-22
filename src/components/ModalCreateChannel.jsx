import React, { useEffect, useRef } from 'react';
import {
  Modal, Button, Form, FormControl, InputGroup, Spinner,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useAPI from '../hooks/useAPI.jsx';
import { setCurrentChannelId } from '../store/slice.js';

const ModalCreateChannel = ({ close, channelsNames, dispatch }) => {
  const { api: { addChannel } } = useAPI();

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      channelName: Yup.string().trim()
        .notOneOf(channelsNames, 'Должно быть уникальным')
        .required(),
    }),
    onSubmit: async (values) => {
      const name = values.channelName.trim();
      try {
        const res = await addChannel({ name });
        const { id } = res.data;
        dispatch(setCurrentChannelId({ id }));
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
        <Modal.Title>Добавить канал</Modal.Title>
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
              name="channelName"
              required
              placeholder=""
              maxLength={20}
              value={formik.values.channelName}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.channelName}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.channelName}</Form.Control.Feedback>
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
