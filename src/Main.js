import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import Queue from './Queue'
import Info from './Info'
import Sidenav from './Sidenav'
import './Main.css';
import firebase from 'firebase'


class Main extends Component {
  constructor(props) {
    super(props);
  }

  pushToDB() {
    var link = document.getElementById("myLink").value;
    var database = firebase.database().ref().limitToFirst(1);
      database.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var url = childSnapshot.val();
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
        <div className="trackplayinginfo">
          <div className="flexbox2">
            <div className="videoplayer">


            </div>
            <Info />
          </div>
        </div>
        <div className="inputcontainer">
          <label className="linkT">
            Music Link:
          </label>
          <input id="myLink" className="inputL" type="text"/>
          <button className="inputB" id="myBtn" onClick={()=> this.pushToDB()}>Submit</button>

        </div>
          <Queue />
      </div>
    );
  }
}

export default Main;
