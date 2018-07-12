import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './App.css';
import Player from './Player';
import Table from './Table'
class App extends Component {
  render () {
    return (
      <div className="app">
        <center><img src="Qvinyl.png" width= "25%" height= "25%"/></center>
        <Player />
      </div>
    );
  }
}
  
export default App;


