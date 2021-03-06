import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";
import Navbar from "./navBar.jsx";
import Footer from "./footer.jsx";
import Sidebar from "./sideBar.jsx";
import FixedPlugin from "./fixedPlugin";

import routes from "./routes.js";

var ps;

class BaseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "dark",
      activeColor: "default"
    };
    this.mainPanel = React.createRef();
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = this.mainPanel.current && new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      if (ps)
        ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }

  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };

  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };

  render() {
    const { currentUser } = this.props.authData
    if (!currentUser)
      return <Redirect to="/login-register" />;
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <Navbar {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
          <Footer fluid />
        </div>
        <FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
        />
      </div>
    )
  }

};

const mapStateToProps = (state) => {
  return {
    authData: state.authData
  }
}

export default connect(mapStateToProps)(BaseLayout);
