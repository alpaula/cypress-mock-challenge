// Libs
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// Components
import Private from './private';
import Login from './pages/Login';
import Layouts from './pages/Layouts';

const { worker } = require('./mocks/browser');
worker.start();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Private render={(props) => <Layouts {...props} />} />
    </Switch>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
