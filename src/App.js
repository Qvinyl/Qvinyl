import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './App.css';
import Sidenav from './Sidenav'
import Main from './Main'
import Chat from './Chat'
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDG-IPOENqC8cDOdsm683gz-MGQUYroero",
    authDomain: "qvinyl-d222d.firebaseapp.com",
    databaseURL: "https://qvinyl-d222d.firebaseio.com",
    projectId: "qvinyl-d222d",
    storageBucket: "qvinyl-d222d.appspot.com",
    messagingSenderId: "912092441416"
};
firebase.initializeApp(config);

class App extends Component {
  render () {
    return (
      <div className="app">
        <div className="banner">
          <div className="flexbox">

            <div className="title">Qvinyl</div>
            <pre id="object"></pre>
            <div className="settings">Settings</div>
          </div>
        </div>
        <div className="flexbox">
          <Sidenav />
          <Main />
          <Chat />
        </div>
      </div>
    );
  }
}

export default App;
