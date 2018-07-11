import React, { Component } from 'react'
import Queue from './Queue'
import Info from './Info'
import './Main.css';
import Player from './Player'
import firebase from 'firebase'


class Main extends Component {

  pushToDB() {
    var link = document.getElementById("myLink").value;
    var database = firebase.database().ref().limitToFirst(1);
      database.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
          console.log("KEY: " + key);
          var selected = firebase.database().ref(key + '/songs');
          if (link.includes("https://www.youtube.com/") || link.includes("https://soundcloud.com/") ||
              link.includes("https://vimeo.com/")) {
            selected.push(link);
          }
        });
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
          <button className="inputB" id="myBtn" onClick={()=> this.pushToDB()}>Submit</button>
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
