import React, { useEffect, useRef } from 'react';
import {
  Button, Form, FormGroup, FormControl, FormLabel, Card,
} from 'react-bootstrap';
import pic from '.././img/signup.jpeg';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth.jsx';
import axios from 'axios';
import { useHistory,} from 'react-router-dom';

const Signup = () => {

  const auth = useAuth();
  const inputRef = useRef();
  const history = useHistory();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

const signupSchema = yup.object({
    username: yup.string().required().min(3).max(20),
    password: yup.string().required().min(6),
    checkpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      checkpassword: '',
    },
    validateOnChange: false,
    validationSchema: signupSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const { username, password } = values;
        const { data } = await axios.post('/api/v1/signup', { username, password });
        localStorage.setItem('user', JSON.stringify(data));
        auth.logIn();
        history.push('/');
      } catch (err) {
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
               <img src={pic} className="rounded-circle" alt="Регистрация" />
               </div>

               <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    ref={inputRef}
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Имя пользователя"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.touched.username && formik.errors.username}
                  />
                  <FormLabel htmlFor="username">Имя пользователя</FormLabel>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.username && formik.errors.username && 'От 3 до 20 символов'}
                  </Form.Control.Feedback>
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
                    isInvalid={formik.touched.password && formik.errors.password}
                  />
                  <FormLabel htmlFor="password">Пароль</FormLabel>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.password && formik.errors.password && 'Не менее 6 символов'}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="password"
                    id="checkpassword"
                    name="checkpassword"
                    autoComplete="current-password"
                    required
                    placeholder="Подтвердить пароль"
                    onChange={formik.handleChange}
                    value={formik.values.checkpassword}
                    isInvalid={formik.touched.checkpassword && formik.errors.checkpassword}
                  />
                  <FormLabel htmlFor="checkpassword">Подтвердить пароль</FormLabel>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.checkpassword && formik.errors.checkpassword && 'Пароли должны совпадать'}
                  </Form.Control.Feedback>
                </FormGroup>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                >
                  Войти
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