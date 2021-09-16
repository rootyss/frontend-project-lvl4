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
import authContext from './context/index.jsx';
import useAuth from './hooks/index.jsx';

import { isAuth, getAuthHeader } from './utils.js';

import axios from 'axios';

/*
channelsInfo: {
  channels: {
    {
    id: 1,
    name: string,
    removeable: false,
    },
    currentChannelId: 1
  },
  messagesInfo: {
    messages: {
      {
        body: text message,
        channelId: 1,
        username: 'admin',
        id: 5
      }
    }
  },
  modal: {
    isOpenes: false,
    type: null,
    extra: null,
  }
}
*/

const lol = async () => {
  if (isAuth()) {
    const resp = await axios.get('/api/v1/data', { headers: getAuthHeader() });
    console.log(resp.data);
  }
};
lol();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(isAuth());

  const logIn = () => setLoggedIn(true);
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

const App = () => (
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
);

export default App;
