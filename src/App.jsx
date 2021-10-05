import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import NoMatch from './components/NoMatch.jsx';
import Chat from './components/Chat.jsx';
import NavBar from './components/NavBar.jsx';
import authContext from './context/authContext.js';
import useAuth from './hooks/useAuth.jsx';
import ModalWindow from './components/modals/index.jsx';
import Signup from './components/Signup.jsx';
import routes from './routes.js';
import { getUsername, isAuth } from './utils.js';

const AuthProvider = ({ children }) => {
  const [isUser, setisUser] = useState(isAuth());
  const logIn = () => {
    setisUser(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setisUser(false);
  };

  return (
    <authContext.Provider value={{
      isUser, logIn, logOut, getUsername,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();
  return (
    <Route
      path={path}
      render={({ location }) => (auth.isUser
        ? children
        : <Redirect to={{ pathname: routes.loginPagePath(), state: { from: location } }} />)}
    />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Switch>
          <PrivateRoute exact path="/">
            <Chat />
          </PrivateRoute>
          <Route path={routes.loginPagePath()}>
            <LoginPage />
          </Route>
          <Route path={routes.signupPagePath()}>
            <Signup />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
    <ModalWindow />
  </AuthProvider>
);

export default App;
