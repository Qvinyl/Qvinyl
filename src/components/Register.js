import React, { Component } from 'react'
import { auth } from '../helpers/auth'
import './Login.css'
import logo from './LoginLogo.png';
import {firebaseAuth } from '../config/constants'
import firebase from 'firebase'
import './Register.css'

import {
  CustomInput, Form, FormGroup, Label, Container, Row, Col,
  InputGroup, InputGroupAddon, InputGroupText, Input, Button
} from 'reactstrap';

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault();
    auth(this.email.value, this.pw.value)
      .catch(e => this.setState(setErrorMsg(e)))

    firebaseAuth().createUserWithEmailAndPassword(this.email.value, this.pw.value).then((user) => {
      console.log(user);
      var user1= firebase.auth().currentUser;
      console.log(user1);
      user1.updateProfile({
        displayName: this.firstName.value + " " + this.lastName.value,
      }).then(function() {
        // Update successful.
        console.log(user1.displayName);
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
          <Col sm="6" className="center">

              <Form className="loginForm" onSubmit={this.handleSubmit}>
              <FormGroup>
                <div className="flexbox">
                  <input className="firstname" type="name" style={{width: '50%'}} className="form-control" placeholder="First Name" ref={(firstName) => this.firstName = firstName} />
                  <input className="lastname" type="name" style={{width: '50%'}} className="form-control" placeholder=" Last Name" ref={(lastName) => this.lastName = lastName} />
                </div>
              </FormGroup>
                <FormGroup>
                  <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
                </FormGroup>
                <FormGroup>
                  <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
                </FormGroup>
                <Button type="submit" style={{width: '50%'}}>Register</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
