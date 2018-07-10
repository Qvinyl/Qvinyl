import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import Queue from './Queue'
import Info from './Info'
import Player from './Player'
import './Main.css';
import firebase from 'firebase'


class Main extends Component {
  constructor() {
    super();
  }

  pushToDB() {
    var database = firebase.database();
    var urlRef = database.ref('URLS');
    var link = document.getElementById("myLink").value;
    if (link.includes("https://www.youtube.com/") || link.includes("https://soundcloud.com/") ||
        link.includes("https://vimeo.com/")) {
      var pushDB = urlRef.push(link);
    }
    const preObject = document.getElementById('myLink');
    const dbRefObject = firebase.database().ref().child('URLS');
    dbRefObject.on('value', snap => console.log(snap.val()));
  }

  render () {
    return (
      <div className="main">
        <div className="mainTitle">Audio Room</div>
        <div className="trackplayinginfo">
          <div className="flexbox2">
            <div className="videoplayer">
              <Player/>
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
