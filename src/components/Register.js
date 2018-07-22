import React, { Component } from 'react'
import { auth } from '../helpers/auth'
import './Login.css'
import logo from './logo6.png';
import { ref, firebaseAuth } from '../config/constants'

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
      /*
    firebaseAuth().createUserWithEmailAndPassword(this.email.value, this.pw.value).then((user) => {
      console.log(user);
      user.updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      });
    });
    */
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
                  <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
                </FormGroup>
                <FormGroup>
                  <input type="name" className="form-control" placeholder="Name" ref={(name) => this.name = name} />
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
