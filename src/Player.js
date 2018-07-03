import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './Player.css';
 
class Player extends Component {
  render () {
    return (
      <div className="player">
      	<div className="controls">
	      	<a href="javascript():void();"><i className="fa fa-chevron-left"></i></a>
	      	<a href="javascript():void();"><i className="fa fa-play"></i></a>
	      	<a href="javascript():void();"><i className="fa fa-chevron-right"></i></a>
      	</div>
      	<div className="progress">
      		<div className="bar">
      		</div>
      	</div>
      	<div className="hide">
      		<ReactPlayer url='https://www.youtube.com/watch?v=fYn5-tW6y7o&start_radio=1&list=RDfYn5-tW6y7o' playing />
      	</div>
      </div>
    );
  }
}
  
export default Player;



