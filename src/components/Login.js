import React, { Component } from 'react'
import { login, resetPassword } from '../helpers/auth'
import './Login.css'
import logo from './Logo7.png';
import { Link } from 'react-router-dom'

import {
    Form, FormGroup, Container, Row, Col,
    InputGroup, Input, Button
} from 'reactstrap';


// catching error messages
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
