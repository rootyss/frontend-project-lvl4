import React, { useEffect, useRef } from 'react';
import {
  Modal, Button, Form, FormControl, FormGroup, InputGroup, Spinner,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useAPI from '../../hooks/useAPI.jsx';
import { setCurrentChannelId, getChannelsNames } from '../../store/slice.js';

const ModalCreateChannel = ({ close }) => {
  const dispatch = useDispatch();
  const { api: { addChannel } } = useAPI();
  const { t } = useTranslation();
  const channelsNames = useSelector(getChannelsNames);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      channelName: Yup.string().trim()
        .min(3, t('errors.nameLength'))
        .max(20, t('errors.nameLength'))
        .notOneOf(channelsNames, t('errors.uniqNameChanel'))
        .required(t('errors.required')),
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
  }, [channelsNames]);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
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
              data-testid="add-channel"
              isInvalid={formik.errors.channelName}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.channelName}</Form.Control.Feedback>
          </InputGroup>
        </Form>
        <FormGroup className="d-flex justify-content-end mt-3">
          <Button
            className="me-2"
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
            variant="primary"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" role="status" />
              </>
            ) : t('buttons.send')}
          </Button>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer className="justify-content-between" />
    </>
  );
};

export default ModalCreateChannel;
