import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Channels from './Channels.jsx';
import { fetchInfo } from '../store/slice.js';
import Messages from './Messages.jsx';
import { getUsername } from '../utils.js';
import useAPI from '../hooks/useAPI.jsx';

const ChatWindow = () => {
  const textInput = useRef();
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const username = getUsername();
  const { api: { sendMessage } } = useAPI();

  useEffect(() => {
    textInput.current.focus();
  }, [textInput]);

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
    <div className="row h-100 bg-white flex-md-row">
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>Каналы</span>
          <button type="button" className="p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <Channels />
      </div>
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b># general</b></p>
            <span className="text-muted">15 сообщений</span>
          </div>
          <Messages />
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
                  placeholder="Введите сообщение..."
                  className="border-0 p-0 ps-2 form-control"
                  onChange={formik.handleChange}
                  value={formik.values.body}
                  ref={textInput}
                  maxLength={400}
                />
                <div className="input-group-append">
                  <button disabled="" type="submit" className="btn btn-group-vertical">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                     <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                   </svg>
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Chat = () => {
  const dispatch = useDispatch();
  const { fetchingState } = useSelector((state) => state.fetchingState);

  useEffect(() => {
    dispatch(fetchInfo());
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {fetchingState !== 'finished' ? <Spinner animation="border" /> : <ChatWindow />}
    </div>
  );
};

export default Chat;
