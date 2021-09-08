import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
import Form from "./components/Form.jsx";
import NoMatch from "./components/NoMatch.jsx";

const App = () => {
  return (
    <Router>
        <Switch>
          <Route path="/login">
            <Form />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
          <Route exact path="/">
            <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
          </Route>
        </Switch>
    </Router>
  );
};

export default App;

