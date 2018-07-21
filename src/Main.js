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
    this.getRoomName = this.getRoomName.bind(this);
    this.getUserList = this.getUserList.bind(this);
  }

  checkValidKey() {
    var isValid = false;
    var link = document.getElementById("roomLink").value;
    var rooms = firebase.database().ref('rooms/');
    rooms.once('value').then((snapshot) => {
      snapshot.forEach((room) => {
        console.log('Link: ' + link);
        console.log('room: ' + room.key);
        if (link === room.key) {
          isValid = true;
          console.log("The Key is valid");
          this.joinRoom();
          return true;
        }
      });
    });
    if (isValid == true) {
      console.log('is valid key');
    }
    else{
      console.log("Key is not valid");
    }
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

  getUserList() {
      try {
        var userID = firebase.auth().currentUser.uid;
      } catch(exception) {
        this.getUserList.bind(this);
      }
      var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
      getRoom.on('value', (snapshot) => {
        try {
          var roomKey = snapshot.val().currentRoom;
        } catch (exception) {
          this.getUserList.bind(this);
        }
        var roomLocation = firebase.database().ref('/rooms/' + roomKey);
        /*
        roomLocation.once('value').then((snapshot) => {
          var roomTitle = snapshot.val().roomname;
          this.setState({
            roomTitle: roomTitle
          })
        });
        */
        var userList = firebase.database().ref('/rooms/' + roomKey + '/users');
        userList.on('value', (user) => {
          console.log("in userList");
          this.setState({
            userList: []
          })
          user.forEach((childSnapshot) => {
            var id = childSnapshot.val();
            var keys = Object.keys(childSnapshot.val());
            var getName = firebase.database().ref('users/' + id + '/name');
            getName.once('value').then((name) => {
                var gotName = name.val();
                this.setState({
                    userList: this.state.userList.concat([{
                    name: gotName,
                    id: id
                }])
              });
            });
          });
        });
      });
      /*
      try {
        var userID = firebase.auth().currentUser.uid;
      } catch(exception) {
        this.getUserList.bind(this);
      }
      var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
      getRoom.on('value', (snapshot) => {
        try {
          var roomKey = snapshot.val().currentRoom;
          console.log("currentRoom: " + roomKey);
        } catch (exception) {
          this.getUserList.bind(this);
        }
        var roomLocation = firebase.database().ref('/rooms/' + roomKey);
        roomLocation.once('value').then((snapshot) => {
          try {
            var roomTitle = snapshot.val().roomname;
          } catch(exception) {
            this.getUserList();
          }
          this.setState({
            roomTitle: roomTitle
          })
        });
      });
      */
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

  componentDidMount() {
    //setTimeout(this.getUserList.bind(this), 1000);
  }

  render () {
    const {userList} = this.state;
    return (
      <div className="main">

          <div className="mainTitle">{this.state.roomTitle}
            <i className="fas fa-key key" onClick={this.getRoomName}></i>
              <label style={{marginLeft: 10}} className="linkT">
                {this.state.currentRoomKey}
              </label>
          </div>

        <div className="mainInputContainer flexbox">
          <div className="inputContainer">
            <label className="linkT">Music Link:</label>
            <InputGroup >
              <InputGroupAddon addonType="prepend">♫♪</InputGroupAddon>
              <Input id="myLink" placeholder="youtube.com"/>
              <Button color="primary"  id="myBtn" onClick={()=> this.pushMusicToDB()}>
                Submit
              </Button>
            </InputGroup>
          </div>

          <div className="inputContainer">
            <label className="linkT"> Room Link: </label>
            <InputGroup >
              <InputGroupAddon addonType="prepend">https://</InputGroupAddon>
              <Input placeholder="https://Qvinyl/Rooms/a47BD89"/>
              <Button color="primary"  id="myBtn" onClick={()=> this.checkValidKey()}>
                Join Room
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
