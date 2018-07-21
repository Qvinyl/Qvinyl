import React, { Component } from 'react'
import Queue from './Queue'
import './Main.css';
import Player from './Player'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Table } from 'reactstrap'
import firebase from 'firebase'
import './Queue.css';



class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roomTitle: '',
      currentRoomKey: ''
    };
    this.getRoomKey = this.getRoomKey.bind(this);
    this.getRoomName = this.getRoomName.bind(this);
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
    });
  }

  getRoomKey() {
    var userID = firebase.auth().currentUser.uid;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then((snapshot) => {
      try {
        var roomKey = snapshot.val().currentRoom;
        this.setState({
          currentRoomKey: roomKey
        })
      } catch (exception) {
        this.getRoomKey.bind(this);
      }
    });

    // copy to ClipBoard
    var textField = document.createElement('textarea');
    textField.innerText = this.state.currentRoomKey;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  getRoomName() {
    var userID = firebase.auth().currentUser.uid;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.on('value', (snapshot) => {
      try {
        var roomKey = snapshot.val().currentRoom;
      } catch (exception) {
        this.getRoomName.bind(this);
      }
      var roomLocation = firebase.database().ref('rooms/' + roomKey);
      roomLocation.once('value').then((snapshot) => {
        try {
          var roomTitle = snapshot.val().roomname;
        } catch (exception) {
          this.getRoomName.bind(this);
        }
        this.setState({
          roomTitle: roomTitle
        });
      });
    });
  }

  componentDidMount() {
    setTimeout(this.getRoomName.bind(this), 1000);
  }

  render () {
    const {userList} = this.state;
    return (
      <div className="main">

          <div className="mainButton">
            <i className="fas fa-search roomKey" onClick={this.getRoomKey}></i>
            <i className="fas fa-key searchSong" onClick={this.getRoomKey}></i>
          </div>
          <div className="roomWithKey">
            <p className="mainTitle">
              {this.state.roomTitle}
            </p>
          </div>

          

        <div className="mainInputContainer flexbox">
          <div className="inputContainer">
           {/*} <label className="linkT">Music Link:</label> */}
            <InputGroup >
              <InputGroupAddon addonType="prepend">♫♪</InputGroupAddon>
              <Input id="myLink" placeholder="Paste Music Link Here" />
              <Button size="sm" color="primary"  id="myBtn" onClick={()=> this.pushMusicToDB()}>
                Submit
              </Button>
            </InputGroup>
          </div>
        </div>
        <div>
          <Queue />
        </div>
      </div>
    );
  }
}

export default Main;
