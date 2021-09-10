import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Button, Form, FormGroup, FormControl, FormLabel, Card,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import pic from './img/1.jpg';

export const FormComponent = () => {
  const SignupSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const classNames = (isValid) => cn('form-control', {
    'is-invalid': isValid,
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: async () => {
      console.log(formik.errors);
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">Hexlet Chat</a>
        </div>
      </nav>
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
                      className={classNames(formik.errors.username)}
                      autoComplete="username"
                      required
                      placeholder="Ваш ник"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                    />
                    <FormLabel htmlFor="username">Ваш ник</FormLabel>
                  </FormGroup>
                  <FormGroup className="form-floating mb-3">
                    <FormControl
                      type="password"
                      id="password"
                      name="password"
                      className={classNames(formik.errors.username)}
                      autoComplete="current-password"
                      required
                      placeholder="Пароль"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                    />
                    <FormLabel htmlFor="password">Пароль</FormLabel>
                    <Form.Control.Feedback type="invalid">Не верное имя пользователя или пароль</Form.Control.Feedback>
                  </FormGroup>
                  <Button type="submit" className="w-100 mb-3" variant="outline-primary">Войти</Button>
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

    </div>
  );
};

export const NoMatch = () => (
  <div className="d-flex flex-column h-100">
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
      </div>
    </nav>
  </div>
);
