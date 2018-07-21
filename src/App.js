import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './App.css';
import Sidenav from './Sidenav'
import Main from './Main'
import Chat from './Chat'
import Player from './Player'
import Queue from './Queue'
import * as firebase from 'firebase';
import {Container, Row, Col, Button} from 'reactstrap';

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
  constructor (props) {
    super(props);
  }
  render () {
    return (
    <div className="app">
      <Container fluid>
        <div className="appDiv">
          <Row noGutters>
            <Col md="12">
              <Player/>
            </Col>
          </Row>
          <div className="noScroll">
            <Row noGutters>
              <Col md="2">
                <Sidenav/>
              </Col>
              <Col md="8">
                <Row noGutters>
                  <Main/>
                </Row>
              </Col>
              <Col md="2">
                <Chat/>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
    );
  }
}

export default App;
