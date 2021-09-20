import React, { useEffect, useRef, useState } from 'react';
import {
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';
import {
  Button, Form, FormGroup, FormControl, FormLabel, Card,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import pic from '../img/1.jpg';
import useAuth from '../hooks/index.jsx';

const LoginPage = () => {
  const auth = useAuth();

  const [authFailed, setAuthFailed] = useState(false);
  const [fetchingState, setFetchingState] = useState('none');

  const inputRef = useRef();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      setFetchingState('pending');
      try {
        const resp = await axios.post('/api/v1/login', values);
        setFetchingState('finished');
        localStorage.setItem('user', JSON.stringify(resp.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        setFetchingState('error');
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (

    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="card shadow-sm">
            <Card.Body className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={pic} className="rounded-circle" alt="Войти" />
              </div>

              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    ref={inputRef}
                  />
                  <FormLabel htmlFor="username">Ваш ник</FormLabel>
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                  />
                  <FormLabel htmlFor="password">Пароль</FormLabel>
                  <Form.Control.Feedback type="invalid">Не верное имя пользователя или пароль</Form.Control.Feedback>
                </FormGroup>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                  disabled={fetchingState === 'pending'}
                >
                  Войти
                </Button>
              </Form>

            </Card.Body>
            <Card.Footer>
              <div className="d-flex flex-column align-items-center">
                <span className="small mb-2">Не зарегистрированы? </span>
                <Link to="/">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default LoginPage;
