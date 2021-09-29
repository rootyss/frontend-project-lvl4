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
import ModalWindow from './components/Modals/ModalWindow.jsx';
import Signup from './components/Signup.jsx';
import routes from './routes.js';

const AuthProvider = ({ children }) => {
  const getUserToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.token;
    }
    return null;
  };

  const isAuth = () => getUserToken() !== null;

  const [loggedIn, setLoggedIn] = useState(isAuth());
  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const getUsername = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      return userData.username;
    }
    return null;
  };

  return (
    <authContext.Provider value={{
      loggedIn, logIn, logOut, getUsername,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

const ChatRoute = ({ children, path }) => {
  const auth = useAuth();
  return (
    <Route
      path={path}
      render={({ location }) => (auth.loggedIn
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
          <ChatRoute exact path="/">
            <Chat />
          </ChatRoute>
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
