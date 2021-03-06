import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Form, FormGroup, FormControl, FormLabel, Card, Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import pic from '../img/signup.jpeg';
import routes from '../routes.js';

const Signup = () => {
  const [errorSignup, setErrorSignup] = useState(false);

  const auth = useAuth();
  const inputRef = useRef();
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const signupSchema = yup.object({
    username: yup.string().required(t('errors.required')).min(3, t('errors.nameLength')).max(20, t('errors.nameLength')),
    password: yup.string().required(t('errors.required')).min(6, t('errors.passLength')),
    checkpassword: yup.string().oneOf([yup.ref('password'), null], t('errors.passMatch')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      checkpassword: '',
    },
    validateOnChange: false,
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const { username, password } = values;
        const { data } = await axios.post(routes.signupPath(), { username, password });
        auth.logIn(data);
        history.push(routes.host());
      } catch (err) {
        if (err.response.status === 409) {
          setErrorSignup(true);
        }
        console.log(err);
        inputRef.current.select();
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="card shadow-sm">
            <Card.Body className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={pic} className="rounded-circle" alt="??????????????????????" />
              </div>

              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signUp.h1')}</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    onBlur={formik.handleBlur}
                    ref={inputRef}
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('signUp.username')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={(formik.touched.username && formik.errors.username) || errorSignup}
                  />
                  <FormLabel htmlFor="username">{t('signUp.username')}</FormLabel>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.username && formik.errors.username}
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="form-floating mb-3">
                  <FormControl
                    onBlur={formik.handleBlur}
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('placeholders.password')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && formik.errors.password}
                  />
                  <FormLabel htmlFor="password">{t('placeholders.password')}</FormLabel>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.password && formik.errors.password}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    onBlur={formik.handleBlur}
                    type="password"
                    id="checkpassword"
                    name="checkpassword"
                    autoComplete="current-password"
                    required
                    placeholder={t('placeholders.confirmPass')}
                    onChange={formik.handleChange}
                    value={formik.values.checkpassword}
                    isInvalid={(formik.touched.checkpassword && formik.errors.checkpassword)
                      || errorSignup}
                  />
                  <FormLabel htmlFor="checkpassword">{t('placeholders.confirmPass')}</FormLabel>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.checkpassword && formik.errors.checkpassword}
                    {errorSignup ? (
                      <div style={{ color: '#dc3545', fontSize: `${0.875}em`, margintTop: `${0.25}rem` }}>
                        {t('errors.exist')}
                        {' '}
                      </div>
                    ) : null}
                  </Form.Control.Feedback>
                </FormGroup>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                >
                  {formik.isSubmitting ? (
                    <>
                      <Spinner animation="border" size="sm" role="status" />
                    </>
                  ) : t('buttons.reg')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default Signup;
