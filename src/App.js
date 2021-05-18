import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './pages/login';
import Main from './pages/main';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/main">
          <Main />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}