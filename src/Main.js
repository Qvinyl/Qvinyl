import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import Queue from './Queue'
import Info from './Info'
import './Main.css';
class Main extends Component {
  render () {
    return (
      <div className="main">
        <div className="mainTitle">Audio Room</div>
        <div className="trackplayinginfo">
          <div className="flexbox2">
            <div className="videoplayer">
              <ReactPlayer url='https://www.youtube.com/watch?v=fYn5-tW6y7o&start_radio=1&list=RDfYn5-tW6y7o' playing />
            </div>
            <Info />
          </div>
        </div>
        <div className="inputcontainer">
          <form>
            <label className="linkT">
              Music Link:
            </label>
            <input className="inputL" type="text" name="name" />
            <input className="inputB" type="submit" value="Submit" />
          </form>
        </div>
          <Queue />
      </div>
    );
  }
}

export default Main;
