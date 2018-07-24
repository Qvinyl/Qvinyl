import React, { Component } from 'react'
import { auth } from '../helpers/auth'
import './Login.css'
import logo from './LoginLogo.png';
import {firebaseAuth } from '../config/constants'
import firebase from 'firebase/app'
import './Register.css'
import { Link } from 'react-router-dom'

import {
  Form, FormGroup, Container, Row, Col, Input, Button, FormText
} from 'reactstrap';

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (error) => {
    error.preventDefault();
    auth(this.email.value, this.pw.value)
      .catch(error => this.setState(setErrorMsg(error)))
    firebaseAuth().createUserWithEmailAndPassword(this.email.value, this.pw.value)
        .then((user) => {
            console.log("email: " + this.email.value);
            var user1= firebase.auth().currentUser;
            user1.updateProfile({
                displayName: this.firstName.value + " " + this.lastName.value,
            }).then(function() {
                console.log("email: " + user1.displayName);
            }).catch(function(error) {
                // An error happened.
            });
        });
  }
  render () {
    return (
      <div className='background'>
        <div className="centerLogo">
          <img src={logo} alt="Logo" className='logo6' />
        </div>
        <Container>
          <Row>
          <Col sm="6" className="centerlogin">

              <Form className="loginForm" onSubmit={this.handleSubmit}>
              <FormGroup>
                <div className="flexbox">
                  <Input className="firstname" type="name"
                    style={{width: '50%'}} placeholder="First Name"
                    innerRef={(firstName) => this.firstName = firstName} />
                  <Input className="lastname" type="name"
                    style={{width: '50%'}} placeholder="Last Name"
                    innerRef={(lastName) => this.lastName = lastName} />
                </div>
              </FormGroup>
                <FormGroup>
                  <Input innerRef={(email) => this.email = email} placeholder="Email"/>
                </FormGroup>
                <FormGroup>
                  <Input type="password" placeholder="Password" innerRef={(pw) => this.pw = pw} />
                  <FormText>Password must be at least 8 characters.</FormText>
                </FormGroup>
                <Button type="submit" style={{width: '50%'}}>Register</Button>
                <p className="register">
                  Already have an account? Let's
                  <Link to="/login"> Login</Link>.
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
