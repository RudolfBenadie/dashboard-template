import React from 'react';
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/lunularia.scss?v=1.1.0";
// import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import BaseLayout from "./layouts/baseLayout";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
    // <BrowserRouter>
    //   <Switch>
    //     <Route path="/" render={props => <BaseLayout {...props} />} />
    //     {/* <Redirect to="/admin/dashboard" /> */}
    //   </Switch>
    //   {/* <div className="App">
    //     <header className="App-header">
    //     </header>
    //   </div> */}
    // </BrowserRouter>
  );
}

export default App;
