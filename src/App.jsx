import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginPage from './components/LoginPage.jsx';
import NoMatch from './components/NoMatch.jsx';
import Chat from './components/Chat.jsx';
import NavBar from './components/NavBar.jsx';
import authContext from './context/index.jsx';
import useAuth from './hooks/index.jsx';
import { isAuth } from './utils.js';
import { fetchChanelsInfo } from './store/slice.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(isAuth());
const dispatch = useDispatch();
  const logIn = () => {
    setLoggedIn(true)
    dispatch(fetchChanelsInfo());
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
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
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

const App = () => {

  return (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Switch>
          <ChatRoute exact path="/">
            <Chat />
          </ChatRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  </AuthProvider>
)};

export default App;
