import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// reactstrap components
import {
  Card,
  // CardHeader,
  CardBody,
  // CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { signIn } from '../store/actions/authActions';

class Authenticate extends Component {

  state = {
    email: null,
    password: null
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmitLogin = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  render() {
    const { authError, currentUser } = this.props.authData;
    if (currentUser) return <Redirect to="/" />
    return (
      <div className="authenticate wrapper" >
        <Row>
          <Col lg="3" md="6" sm="6" className="centre">
            <Card>
              <CardBody>
                <CardTitle tag="p">Login/Register</CardTitle>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-key-25 text-warning" />
                    </div>
                    <div className="container">
                      <form onSubmit={this.handleSubmitLogin} className="whitesmoke">
                        <h3 className="grey-text text-darken-4">Sign in</h3>
                        <div className="input-field">
                          <label htmlFor="email">Email</label>
                          <input type="email" id="email" onChange={this.handleChange} ></input>
                        </div>
                        <div className="input-field">
                          <label htmlFor="password">Password</label>
                          <input type="password" id="password" onChange={this.handleChange} ></input>
                        </div>
                        <div className="input-field">
                          <button className="lightsalmon btn z-depth-0">Login</button>
                          <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                          </div>
                        </div>
                      </form>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
};

const mapStateToProps = (state) => {
  return {
    authData: state.authData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
