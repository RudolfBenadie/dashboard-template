import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/lunularia.scss?v=1.1.0";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import BaseLayout from "./layouts/baseLayout";
import Authenticate from "./layouts/authenticate";

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faTachometerAlt, faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
library.add(fab, faTachometerAlt, faCheckSquare, faCoffee);

class App extends Component {

  render() {
    var { currentUser } = this.props.authData;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/dashboard" render={props => <BaseLayout {...props} />} />
            <Route path="/login-register" render={props => <Authenticate {...props} />} />
            { currentUser ? <Redirect to="/dashboard" /> : <Redirect to="/login-register" />}
          </Switch>
        </div>
      </BrowserRouter>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    authData: state.authData
  }
};

export default connect(mapStateToProps)(App);
