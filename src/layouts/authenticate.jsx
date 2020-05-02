import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  Row,
  Col,

  InputGroup,
  InputGroupAddon,
  Input
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
                  <Col md="6" xs="12">
                    <div className="container">
                      <form onSubmit={this.handleSubmitLogin}>
                        <h4>Sign in</h4>
                        <InputGroup size="sm">
                          <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                          <Input id="email" addon type="text" placeholder="..." onChange={this.handleChange} />
                        </InputGroup>
                        <InputGroup size="sm">
                          <InputGroupAddon addonType="prepend">Password: </InputGroupAddon>
                          <Input id="password" addon type="password" placeholder="..." onChange={this.handleChange} />
                        </InputGroup>
                        <div className="form-group">
                          <button className="btn btn-dark">Login</button>
                          <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                          </div>
                        </div>
                      </form>
                    </div>
                  </Col>
                  <Col md="6" xs="12">
                    <div className="signUpContainer">
                      <form onSubmit={this.handleSubmitRegister}>
                        <h4>Sign up</h4>
                        <InputGroup size="sm">
                          <InputGroupAddon addonType="prepend">Email: </InputGroupAddon>
                          <Input id="signUpEmail" addon type="email" placeholder="..." onChange={this.handleChange} />
                        </InputGroup>
                        <InputGroup size="sm">
                          <InputGroupAddon addonType="prepend">Password: </InputGroupAddon>
                          <Input id="signUpPassword" addon type="password" placeholder="..." onChange={this.handleChange} />
                        </InputGroup>
                        <InputGroup size="sm">
                          <InputGroupAddon addonType="prepend">Confirm password: </InputGroupAddon>
                          <Input id="confirmPassword" addon type="password" placeholder="Retype password here..." onChange={this.handleChange} />
                        </InputGroup>
                        <InputGroup size="sm">
                          <InputGroupAddon addonType="prepend">First name(s): </InputGroupAddon>
                          <Input id="firstNames" addon type="text" placeholder="..." onChange={this.handleChange} />
                        </InputGroup>
                        <InputGroup size="sm">
                          <InputGroupAddon addonType="prepend">Last name: </InputGroupAddon>
                          <Input id="lastName" addon type="text" placeholder="..." onChange={this.handleChange} />
                        </InputGroup>
                        <InputGroup size="sm">
                          <InputGroupAddon addonType="prepend">ID/Passport number: </InputGroupAddon>
                          <Input id="idNumber" addon type="text" placeholder="..." onChange={this.handleChange} />
                        </InputGroup>
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
