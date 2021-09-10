import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { FormComponent, NoMatch } from './components.jsx';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <FormComponent />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  </Router>
);

export default App;
