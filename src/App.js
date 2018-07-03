import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './App.css';
import Player from './Player';
import Table from './Table'
class App extends Component {
  render () {
    return (
      <div className="app">
        <div className="title">Q vinyl</div>
        <Player />
        <Table />

      </div>
    );
  }
}
  
export default App;


