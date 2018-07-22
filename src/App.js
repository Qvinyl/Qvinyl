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
    apiKey: "AIzaSyCPc36j9KKh0OHwNp6jxnZAImJmdoSmdN0",
    authDomain: "qvinyl-d19ec.firebaseapp.com",
    databaseURL: "https://qvinyl-d19ec.firebaseio.com",
    projectId: "qvinyl-d19ec",
    storageBucket: "qvinyl-d19ec.appspot.com",
    messagingSenderId: "218472401275"
  };
  firebase.initializeApp(config);

function logoutButton(){
    firebase.auth().signOut();
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userID: false,
    };
  }

  checkLoggedIn() {
    var user = firebase.auth().currentUser;
    if (user) {
      this.setState({
        userID: true
      });
    }
    else {
      console.log('user is not logged in');
      window.location.href = "login.html";

    }
  }

  componentDidMount() {
    setTimeout(this.checkLoggedIn.bind(this), 1000);
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
