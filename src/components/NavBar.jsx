import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Navbar,
  Button,
} from 'react-bootstrap';
import useAuth from '../hooks/useAuth.jsx';
import { useTranslation } from 'react-i18next';

const ButtonLogOut = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    auth.loggedIn ? <Button onClick={auth.logOut}>{t('navBar.exit')}</Button> : null
  );
};

const NavBar = () => {
  const { t } = useTranslation();
return (
  <Navbar bg="white" expand="lg" className="shadow-sm">
    <div className="container">
      <Link className="navbar-brand" to="/">{t('navBar.nameProject')}</Link>
      <ButtonLogOut />
    </div>
  </Navbar>
  );
};

export default NavBar;
