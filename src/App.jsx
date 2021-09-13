import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { FormComponent, NoMatch, Chat } from './components.jsx';

const isAuth = () => {
  const user = localStorage.getItem('user');
  return user ? true : false;
}

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        {isAuth() ? <Chat /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        {isAuth() ? <Redirect to='/' /> : <FormComponent />}
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  </Router>
);

export default App;
