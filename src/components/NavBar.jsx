import React, { useContext } from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Navbar,
  Button,
} from 'react-bootstrap';
import authContext from '../context/index.jsx';

const ButtonLogOut = () => {
  const auth = useContext(authContext);

  return (
    auth.loggedIn ? <Button onClick={auth.logOut}>Exit</Button> : null
  );
};

const NavBar = () => (
  <Navbar bg="white" expand="lg" className="shadow-sm">
    <div className="container">
      <Link className="navbar-brand" to="/">Hexlet Chat</Link>
      <ButtonLogOut />
    </div>
  </Navbar>
);

export default NavBar;
