import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './Chat.css';
class Chat extends Component {
  render () {
    return (
      <div className="chatbar">
        <div className="chattitle">Chat Room</div>
        <div className="messagebox">
        </div>
      </div>
    );
  }
}

export default Chat;
