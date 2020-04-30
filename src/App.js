import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/lunularia.scss?v=1.1.0";
// import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import BaseLayout from "./layouts/baseLayout";
// import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/dashboard" render={props => <BaseLayout {...props} />} />
          <Redirect to="/dashboard" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
