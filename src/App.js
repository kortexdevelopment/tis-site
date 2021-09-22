import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './pages/login';
import Main from './pages/main';
import {Main as CorpoMain} from './pages/corporate/main';
import {Login as CorpoLog} from './pages/corporate/login';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/main">
          <Main />
        </Route>
        <Route exact path="/corporate">
          <CorpoLog />
        </Route>
        <Route exact path="/corporate/main">
          <CorpoMain />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}