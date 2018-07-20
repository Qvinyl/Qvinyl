import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './App.css';
import Sidenav from './Sidenav'
import Main from './Main'
import Chat from './Chat'
import Player from './Player'
import Queue from './Queue'
import * as firebase from 'firebase';
import {Container, Row, Col, Button} from 'reactstrap'

{/*Jac is testing pushing on master lol*/}

var config = {
    apiKey: "AIzaSyDG-IPOENqC8cDOdsm683gz-MGQUYroero",
    authDomain: "qvinyl-d222d.firebaseapp.com",
    databaseURL: "https://qvinyl-d222d.firebaseio.com",
    projectId: "qvinyl-d222d",
    storageBucket: "qvinyl-d222d.appspot.com",
    messagingSenderId: "912092441416"
};
firebase.initializeApp(config);

function logoutButton(){
    firebase.auth().signOut();
}

class App extends Component {
  render () {
    return (

    <Container fluid>  
      <div className="app">
        <Row>
          <div className="banner">
            <div className="flexbox">
              <div className="title">Qvinyl</div>
              <pre id="object"></pre>
              <Button outline color="primary" href="login.html" onClick={logoutButton} className="button"> Logout</Button>
            </div>
          </div>
        </Row>

        <Row>
          <Col md="12">
            <Player/>
          </Col>
        </Row>


        <Row>
          <Col md="2">
            <Sidenav/>
          </Col>
          <Col md="8">
            <Row>
              <Main/>
            </Row>
            <Row>
              <Queue/>
            </Row>
          </Col>
          <Col md="2">
            <Chat/>
          </Col>
        </Row>

      </div>
    </Container>
    );
  }
}

export default App;
