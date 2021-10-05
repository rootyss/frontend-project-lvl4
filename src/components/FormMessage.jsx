import React, { useEffect, useRef } from 'react';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useAPI from '../hooks/useAPI.jsx';
import useAuth from '../hooks/useAuth.jsx';

const channelIdSelector = (state) => state.channelsInfo.currentChannelId;

const FormMessage = () => {
  const { getUsername } = useAuth();
  const textInput = useRef();
  const { api: { sendMessage } } = useAPI();
  const { t } = useTranslation();
  const username = getUsername();
  const channelId = useSelector(channelIdSelector);

  useEffect(() => {
    textInput.current.focus();
  }, [channelId]);

  const messageSchema = yup.object({
    body: yup.string().trim().required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: messageSchema,
    onSubmit: async (values, { resetForm }) => {
      const data = {
        body: values.body,
        username,
        channelId,
      };
      try {
        await sendMessage(data);
        resetForm();
        textInput.current.select();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <form
        noValidate=""
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <div className="input-group has-validation">
          <input
            name="body"
            data-testid="new-message"
            placeholder={t('placeholders.messageText')}
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.body}
            ref={textInput}
            maxLength={400}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-group-vertical" disabled={!formik.dirty}>

              <ArrowRightSquare />
              <span className="visually-hidden">{t('buttons.send')}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormMessage;
