import React, { Component } from 'react'
import { login, resetPassword } from '../helpers/auth'
import './Login.css'
import logo from './LoginLogo.png';
import { Link } from 'react-router-dom'

import {
  CustomInput, Form, FormGroup, Label, Container, Row, Col,
  InputGroup, InputGroupAddon, InputGroupText, Input, Button
} from 'reactstrap';



function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  state = { loginMessage: null }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
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
                  <InputGroup>
                    <Input innerRef={(email) => this.email = email} placeholder="Email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <Input type="password" placeholder="Password" innerRef={(pw) => this.pw = pw} />
                  </InputGroup>
                </FormGroup>
                <Button type="submit" style={{width: '50%'}}>Login</Button>
                <p className="register">
                  Don't have an account? Let's
                  <Link to="/register"> Register</Link>.
                </p>

              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
