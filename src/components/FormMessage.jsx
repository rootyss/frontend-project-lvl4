import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useAPI from '../hooks/useAPI.jsx';
import useAuth from '../hooks/useAuth.jsx';

const FormMessage = () => {
  const { getUsername } = useAuth();
  const textInput = useRef();
  const { api: { sendMessage } } = useAPI();
  const { t } = useTranslation();
  const username = getUsername();
  const channelId = useSelector((state) => state.channelsInfo.currentChannelId);

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

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">{t('buttons.send')}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormMessage;
