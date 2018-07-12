import React, { Component } from 'react'
import Queue from './Queue'
import Info from './Info'
import './Main.css';
import Player from './Player'
import firebase from 'firebase'


class Main extends Component {

  pushMusicToDB() {
    var userID = firebase.auth().currentUser.uid;
    console.log(userID);
    var link = document.getElementById("myLink").value;
    /*
    var database = firebase.database().ref('rooms').limitToFirst(1);
    database.once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        console.log("KEY: " + key);
        console.log(firebase.database().ref('rooms/' + key + '/users'));
        if (childSnapshot.hasChild(uid)) {
          var selected = firebase.database().ref('rooms/' + key + '/songs');
          if (link.includes("https://www.youtube.com/") || link.includes("https://soundcloud.com/") ||
              link.includes("https://vimeo.com/")) {
            selected.push(link);
          }
        }
      });
    });
    */
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then(function(snapshot){
      var roomKey = snapshot.val().room;
      var songLocation = firebase.database().ref('rooms/' + roomKey + '/songs');
      if (link.includes("https://www.youtube.com/")  
        || link.includes("https://soundcloud.com/") 
        || link.includes("https://vimeo.com/")) {
        songLocation.push(link);
      }
      console.log("this is roomKey: " + roomKey);
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
          <button className="inputB" id="myBtn" onClick={()=> this.pushMusicToDB()}>Submit</button>
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
