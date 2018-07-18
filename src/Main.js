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
    if (link == "") {
      return;
    }
    var userID = firebase.auth().currentUser.uid;
    var displayName = firebase.auth().currentUser.displayName;
    var getUser= firebase.database().ref('users/' + userID);
    getUser.push();
    getUser.set({
      name: displayName
    })
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
    var isAdmin = false;
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
          isAdmin = true;
          console.log("am I admin? " + isAdmin);
          var updateUsers = firebase.database().ref('rooms/' + roomKey + '/users');
          updateUsers.once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              var selectedUser = childSnapshot.val();
              var selectedUserKey = childSnapshot.key;
              if ( kickLink == selectedUser ) {
                window.alert(kickLink + " has been removed from the room");
                firebase.database().ref('rooms/' + roomKey + '/users/' + selectedUserKey).remove();
                var getRoom = firebase.database().ref('users/' + kickLink + '/roomKeys');
                getRoom.update({
                  currentRoom: ''
                })
                var numUsers = firebase.database().ref('rooms').child(roomKey).child('numberOfUsers');
                numUsers.transaction(function(numberOfUsers) {
                  return (numberOfUsers || 0) - 1;
                });
              }
              console.log("selectedUser: " + selectedUser);
            });
          });
        }
        else{
          console.log("You are not admin");
        }
      });
    });
  }



  pushMusicToDB() {
    var userID = firebase.auth().currentUser.uid;
    var name = firebase.auth().currentUser.displayName;
    var link = document.getElementById("myLink").value;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then(function(snapshot){
      var roomKey = snapshot.val().currentRoom;
      if (roomKey == "") {
        return;
      }
      var songLocation = firebase.database().ref('rooms/' + roomKey + '/songs');

      // get youtube ID
      var position = link.lastIndexOf("=");
      var youtubeID = link.slice(position + 1, link.length);

      var youtubeImgURL = 'https://img.youtube.com/vi/' + youtubeID + '/0.jpg';

      var APIkey = 'AIzaSyA04eUTmTP3skSMcRXWeXlBNI0luJ2146c';
      var youtubeAPItitle = 'https://www.googleapis.com/youtube/v3/videos?key=' 
                      + APIkey + '&part=snippet&id=' + youtubeID;
      var youtubeAPIduration = 'https://www.googleapis.com/youtube/v3/videos?key=' 
      + APIkey + '&part=contentDetails&id=' + youtubeID;

      /*
      songLocation.push({
        queueBy: name,
        link: 'https://www.youtube.com/watch?v=5CMuZrTy6jw'
      });
      songLocation.push({
        queueBy: name,
        link: 'https://www.youtube.com/watch?v=SA8dLEBY61o'
      });
      songLocation.push({
        queueBy: name,
        link: 'https://www.youtube.com/watch?v=cULQhvuq1Zc'
      });
      songLocation.push({
        queueBy: name,
        link: 'https://www.youtube.com/watch?v=_DjE4gbIVZk'
      });
      songLocation.push({
        queueBy: name,
        link: 'https://www.youtube.com/watch?v=ZURA7fT-ozM'
      });
      */

      
      if (link.includes("https://www.youtube.com/")
        || link.includes("https://soundcloud.com/")
        || link.includes("https://vimeo.com/")) {
        fetch(youtubeAPItitle).then((response) => response.json()).then((json) => {
          var title = json.items[0].snippet.title;
          fetch(youtubeAPIduration).then((response) => response.json()).then((json) => {
            var duration = json.items[0].contentDetails.duration;
            var minutes = duration.slice(duration.lastIndexOf("T") + 1, duration.lastIndexOf("M"));
            var seconds = duration.slice(duration.lastIndexOf("M") + 1, duration.lastIndexOf("S"));
            duration = (minutes.length == 1 ? "0" + minutes : minutes) 
                      + ":" + (seconds.length == 1 ? "0" + seconds : seconds);
            songLocation.push({
              queueBy: name,
              link: link,
              thumbnail: youtubeImgURL,
              title: title,
              duration: duration
            });
          });
        })


      }
      
      console.log("this is roomKey: " + roomKey);
    });
  }


  getRoomName() {
    var userID = firebase.auth().currentUser.uid;
    var link = document.getElementById("myLink").value;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then((snapshot) => {
      try {
        var roomKey = snapshot.val().currentRoom;
        this.setState({
          currentRoomKey: roomKey
        })
      } catch (exception) {
        this.getRoomName.bind(this);
      }
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

          <br />

          <p>
            <button
              className="inputB" onClick={this.kickUser}>
              Kick User
            </button>
            <input id="kickLink" className="inputL" type="text"/>
          </p>

        </div>
          <div className="video">
            <Player />
          </div>
          <div className="queue">
            <Queue />
          </div>
      </div>
    );
  }
}

export default Main;
