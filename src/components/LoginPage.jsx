import React, { useEffect, useRef, useState } from 'react';
import {
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';
import {
  Button, Form, FormGroup, FormControl, FormLabel, Card, Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import pic from '../img/1.jpg';
import useAuth from '../hooks/useAuth.jsx';

const LoginPage = () => {
  const auth = useAuth();

  const [authFailed, setAuthFailed] = useState(false);

  const { t } = useTranslation();
  const inputRef = useRef();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const SigninSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const resp = await axios.post('/api/v1/login', values);
        localStorage.setItem('user', JSON.stringify(resp.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
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
                <h1 className="text-center mb-4">{t('loginPage.singin')}</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('placeholders.username')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    ref={inputRef}
                  />
                  <FormLabel htmlFor="username">{t('placeholders.username')}</FormLabel>
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('placeholders.password')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                  />
                  <FormLabel htmlFor="password">{t('placeholders.password')}</FormLabel>
                  {authFailed ? <Form.Control.Feedback type="invalid">{t('errors.unauthorized')}</Form.Control.Feedback> : null }
                </FormGroup>
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
              </Form>

            </Card.Body>
            <Card.Footer>
              <div className="d-flex flex-column align-items-center">
                <span className="small mb-2">{t('loginPage.notSingIn')}</span>
                <Link to="/signup">{t('loginPage.signIn')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default LoginPage;
