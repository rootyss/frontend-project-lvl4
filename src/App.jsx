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

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState(userData);
  const logIn = (userIn) => {
    setUser(userIn);
    localStorage.setItem('user', JSON.stringify(userIn));
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <authContext.Provider value={{
      user, logIn, logOut,
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
      render={({ location }) => (auth.user
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
