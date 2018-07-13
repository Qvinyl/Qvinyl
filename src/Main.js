import React, { Component } from 'react'
import Queue from './Queue'
import Info from './Info'
import './Main.css';
import Player from './Player'
import firebase from 'firebase'


class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentRoomKey: ''
    };
    this.getRoomName = this.getRoomName.bind(this);
  }

  joinRoom() {
    var link = document.getElementById("roomLink").value;
    var userID = firebase.auth().currentUser.uid;
    var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
    getRoom.push();
    getRoom.set({
      currentRoom: link
    })
    var updateUsers = firebase.database().ref('rooms/' + link + '/users');
    updateUsers.push(userID);
  }

  pushMusicToDB() {
    var userID = firebase.auth().currentUser.uid;
    var link = document.getElementById("myLink").value;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then(function(snapshot){
      var roomKey = snapshot.val().currentRoom;
      var songLocation = firebase.database().ref('rooms/' + roomKey + '/songs');
      if (link.includes("https://www.youtube.com/")
        || link.includes("https://soundcloud.com/")
        || link.includes("https://vimeo.com/")) {
        songLocation.push(link);
      }
      console.log("this is roomKey: " + roomKey);
    });
  }


  getRoomName() {
    var userID = firebase.auth().currentUser.uid;
    var link = document.getElementById("myLink").value;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then((snapshot) => {
      var roomKey = snapshot.val().currentRoom;
      this.setState({
        currentRoomKey: roomKey
      })
      console.log("this is roomKey: " + roomKey);
      console.log("this is state roomKey: " + this.state.currentRoomKey);
    });
  }

  render () {
    return (
      <div className="main">
        <div className="mainTitle">Audio Room</div>
        <div className="inputcontainer">
          <label className="linkT">
            Music Link:
          </label>
          <input id="myLink" className="inputL" type="text"/>

          <button
            className="inputB" id="myBtn" onClick={()=> this.pushMusicToDB()}>
            Submit
          </button>
          <button onClick={this.getRoomName}>
            Test
          </button>
          {this.state.currentRoomKey}

          <input id="roomLink" type="text"/>
          <button
            className="inputB" id="joinRoom" onClick={()=> this.joinRoom()}>
            Join Room
          </button>

        </div>
        <div className="trackplayinginfo">
          <div className="flexbox2">
            <div className="videoplayer">
              <Player />
            </div>
            <Info />
          </div>
        </div>
          <Queue />
      </div>
    );
  }
}

export default Main;
