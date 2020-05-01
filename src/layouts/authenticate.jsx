import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";
import { signIn, signUp } from '../store/actions/authActions';

class Authenticate extends Component {

  state = {
    email: null,
    password: null,
    signUpEmail: null,
    signUpPassword: null,
    confirmPassword: null,
    firstNames: null,
    lastName: null,
    idNumber: null
  };

  validateSignUpArgs = (signUpArgs) => {
    var errors = [];
    if (!signUpArgs.email) errors.push("Email cannot be empty when registering a new user.");
    if (signUpArgs.password !== signUpArgs.confirmPassword) errors.push("The password and password confirmation must be the same.");
    if (!signUpArgs.password || signUpArgs.password === "") errors.push("The password cannot be empty.");
    if (!signUpArgs.firstNames) errors.push("Please supply a name or names for the new user.");
    if (!signUpArgs.lastNames) errors.push("Please tell us the surname for the new user.");
    if (!signUpArgs.firstNames) errors.push("Please supply an identity number for the new user.");
    return errors;
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmitLogin = (e) => {
    e.preventDefault();
    this.props.signIn({
      email: this.state.email,
      password: this.state.password
    });
  };

  handleSubmitRegister = (e) => {
    e.preventDefault();
    const signUpArgs = {
      email: this.state.signUpEmail,
      password: this.state.signUpPassword,
      confirmPassword: this.state.confirmPassword,
      firstNames: this.state.firstNames,
      lastName: this.state.lastName,
      idNumber: this.state.idNumber
    };
    var validationErrors = this.validateSignUpArgs(signUpArgs);
    if (validationErrors.length === 0) {
      this.props.signUp(signUpArgs);
    } else {
      alert("Cannot sign up the user.\r\nThere are errors in the arguments.");
    };
  };

  render() {
    const { authError, currentUser } = this.props.authData;
    if (currentUser) return <Redirect to="/" />
    return (
      <div className="authenticate wrapper" >
        <Row>
          <Col lg="10" md="10" sm="10" className="centre">
            <Card>
              <CardBody>
                <Row>
                  <Col md="6" xs="6">
                    <div className="container">
                      <form onSubmit={this.handleSubmitLogin}>
                        <h4>Sign in</h4>
                        <div className="form-group">
                          <label htmlFor="email" className="col-form-label col-form-label-sm">Email address</label>
                          <input id="email" type="email" className="form-control form-control-sm" placeholder="Enter email" onChange={this.handleChange}></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="password" className="col-form-label col-form-label-sm">Password</label>
                          <input type="password" placeholder="Enter password" className="form-control form-control-sm" id="password" onChange={this.handleChange} ></input>
                        </div>
                        <div className="form-group">
                          <button className="btn btn-dark">Login</button>
                          <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                          </div>
                        </div>
                      </form>
                    </div>
                  </Col>
                  <Col md="6" xs="6">
                    <div className="signUpContainer">
                      <form onSubmit={this.handleSubmitRegister}>
                        <h4>Sign up</h4>
                        <div className="form-group">
                          <label htmlFor="signUpEmail" className="col-form-label col-form-label-sm">Email</label>
                          <input id="signUpEmail" type="email" placeholder="Enter email" className="form-control form-control-sm" onChange={this.handleChange} ></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="signUpPassword" className="col-form-label col-form-label-sm">Password</label>
                          <input id="signUpPassword" type="password" placeholder="Enter password" className="form-control form-control-sm" onChange={this.handleChange} ></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="confirmPassword" className="col-form-label col-form-label-sm">Confirm password</label>
                          <input id="confirmPassword" type="password" placeholder="Confirm password" className="form-control form-control-sm" onChange={this.handleChange} ></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="firstNames" className="col-form-label col-form-label-sm">First name(s)</label>
                          <input id="firstNames" placeholder="Enter first name(s)" className="form-control form-control-sm" type="text" onChange={this.handleChange} ></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="lastName" className="col-form-label col-form-label-sm">Last name</label>
                          <input id="lastName" placeholder="Enter surname" className="form-control form-control-sm" type="text" onChange={this.handleChange} ></input>
                        </div>
                        <div className="form-group">
                          <label htmlFor="idNumber" className="col-form-label col-form-label-sm">ID/Passport number</label>
                          <input id="idNumber" placeholder="Enter identity number" className="form-control form-control-sm" type="text" onChange={this.handleChange} ></input>
                        </div>
                        <div className="form-group">
                          <button className="btn btn-dark">Register</button>
                          <div className="red-text center-text">
                            {authError ? <p>{authError}</p> : null}
                          </div>
                        </div>
                      </form>
                    </div>
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
    signIn: (credentials) => dispatch(signIn(credentials)),
    signUp: (signUpArgs) => dispatch(signUp(signUpArgs))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
