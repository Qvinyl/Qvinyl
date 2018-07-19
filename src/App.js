import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './App.css';
import Sidenav from './Sidenav'
import Main from './Main'
import Chat from './Chat'
import Player from './Player'
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
              <a href="login.html" onClick={logoutButton} className="button"><span class="glyphicon glyphicon-log-in"></span> Logout</a>
            </div>
          </div>
        </Row>

        <Row>
          <Player/>
        </Row>


        <Row>
          <Col>
            <Sidenav/>
          </Col>
          <Col>
            <Main/>
          </Col>
          <Col>
            <Chat/>
          </Col>
        </Row>


        

      </div>
    </Container>
    );
  }
}

export default App;
