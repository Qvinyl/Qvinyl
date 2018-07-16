import React, { Component } from 'react'
import Queue from './Queue'
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
    var temp = false;
    var link = document.getElementById("roomLink").value;
    var userID = firebase.auth().currentUser.uid;
    var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
    getRoom.push();
    getRoom.set({
      currentRoom: link
    })
    var updateUsers = firebase.database().ref('rooms/' + link + '/users');
    updateUsers.once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var user = childSnapshot.val();
         if (childSnapshot.val() === userID) {
             console.log(childSnapshot.val() === userID);
             temp = true;
             return true;
         }
       });
       if (temp == false) {
         console.log(userID);
         updateUsers.push(userID);
         var numUsers = firebase.database().ref('rooms').child(link).child('numberOfUsers');
         numUsers.transaction(function(numberOfUsers) {
           return (numberOfUsers || 0) + 1;
         });
       }
     });
  }

  kickUser() {
    var kickLink = document.getElementById("kickLink").value;
    var userID = firebase.auth().currentUser.uid;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then(function(snapshot){
      var roomKey = snapshot.val().currentRoom;
      var adminLocation = firebase.database().ref('rooms/' + roomKey + '/admin');
      adminLocation.once('value').then((snapshot) => {
        var admin = snapshot.val();
        console.log('admin: ' + admin);
        if (userID == admin) {
          var updateUsers = firebase.database().ref('rooms/' + roomKey + '/users');
          updateUsers.once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              var selectedUser = childSnapshot.val();
              var selectedUserKey = childSnapshot.key;
              if ( kickLink == selectedUser ) {
                firebase.database().ref('rooms/' + roomKey + '/users/' + selectedUserKey).remove();
              }
              console.log("selectedUser: " + selectedUser);
            });
          });
        }
        else{
          console.log("You are not admin");
        }
      });
      var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
      getRoom.push();
      getRoom.set({
        currentRoom: ''
      })
    });
  }


  pushMusicToDB() {
    var userID = firebase.auth().currentUser.uid;
    var link = document.getElementById("myLink").value;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then(function(snapshot){
      var roomKey = snapshot.val().currentRoom;
      var songLocation = firebase.database().ref('rooms/' + roomKey + '/songs');
      songLocation.push('https://www.youtube.com/watch?v=onbC6N-QGPc');
      songLocation.push('https://www.youtube.com/watch?v=JZjAg6fK-BQ');
      songLocation.push('https://www.youtube.com/watch?v=fS9m0Ac8PCU');
      songLocation.push('https://www.youtube.com/watch?v=CJTElVG7EMY');
      songLocation.push('https://www.youtube.com/watch?v=_t431MAUQlQ');
      songLocation.push('https://www.youtube.com/watch?v=IZKQUOApw1g');
      songLocation.push('https://www.youtube.com/watch?v=P2rT2vw9i_k');
      songLocation.push('https://www.youtube.com/watch?v=zp9I56Vopfg');
      songLocation.push('https://www.youtube.com/watch?v=U7svgD2yPig');
      songLocation.push('https://www.youtube.com/watch?v=-hTD6uEgTVw');
      songLocation.push('https://www.youtube.com/watch?v=W9BM7Poql6c');
      /*
      if (link.includes("https://www.youtube.com/")
        || link.includes("https://soundcloud.com/")
        || link.includes("https://vimeo.com/")) {
        songLocation.push(link);
      }
      */
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

          <p>
            <label className="linkT">
              Music Link:
            </label>
            <input id="myLink" className="inputL" type="text"/>

            <button
              className="inputB" id="myBtn" onClick={()=> this.pushMusicToDB()}>
              Submit
            </button>
          </p>

          <br />

          <p>
            <label className="linkT">
              Room Link:
            </label>
            <input id="roomLink" className="inputL" type="text"/>
            <button
              className="inputB" id="joinRoom" onClick={()=> this.joinRoom()}>
              Join Room
            </button>
          </p>

          <br />

          <p>
            <button
              className="inputB" onClick={this.getRoomName}>
              Room ID
            </button>
            <label style={{marginLeft: 10}} className="linkT">
              {this.state.currentRoomKey}
            </label>
          </p>

          <p>
            <button
              className="inputB" onClick={this.kickUser}>
              Kick User
            </button>
            <input id="kickLink" className="inputL" type="text"/>
          </p>

        </div>

        <div style={{margin: 100}} className="trackplayinginfo">
          <div className="flexbox2">
            <div className="videoplayer">
              <Player />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
