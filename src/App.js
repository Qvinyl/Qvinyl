import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './App.css';
import Sidenav from './Sidenav'
import Main from './Main'
import Chat from './Chat'

class App extends Component {
  render () {
    return (
      <div className="app">
        <div className="banner">
          <div className="flexbox">
            <div className="title">Qvinyl</div>
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
