import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './Sidenav.css';
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import firebase from 'firebase';

class Sidenav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roomList: [{
          roomName: '',
          roomKey: '',
        }],
      addingRoom: false
    };

    this.addRoom = this.addRoom.bind(this);
  }

  addRoom() {
    this.setState({
      addingRoom: !this.state.addingRoom
    })
  }

 searchRoom() {
   var input = document.getElementById("room");
   var filter = input.value.toUpperCase();
   var table = document.getElementById("roomList");
   var tr = table.getElementsByTagName("tr");
   for (var i = 0; i < tr.length; i++) {
      if(tr[i].innerHTML.toUpperCase().includes(filter)) {
         tr[i].style.display = "";
      }
      else{
        tr[i].style.display = "none";
      }
   }
 }

 joinPublicRoom(roomKey) {
   var temp = false;
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
     currentRoom: roomKey
   })
   var updateUsers = firebase.database().ref('rooms/' + roomKey + '/users');
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
        var numUsers = firebase.database().ref('rooms').child(roomKey).child('numberOfUsers');
        numUsers.transaction(function(numberOfUsers) {
          return (numberOfUsers || 0) + 1;
        });
      }
    });
 }

 getRoomList() {
   try {
     var userID = firebase.auth().currentUser.uid;
   } catch(exception) {
     this.getRoomList.bind(this);
   }
   var roomList = firebase.database().ref('rooms/');
   roomList.on('value', (snapshot) => {
     let clear = [];
     this.setState({
       roomList: clear
     })
    snapshot.forEach((childSnapshot) => {
      var roomName = childSnapshot.val().roomname;
      var roomKey = childSnapshot.key;
      var privacy = childSnapshot.val().privacy;
      if (privacy == false) {
        //console.log(childSnapshot.val().roomname);
        try {
          var keys = Object.keys(childSnapshot.val());
        } catch(exception) {
          this.getRoomList();
        }
        this.setState({
            roomList: this.state.roomList.concat([{
            roomName: roomName,
            roomKey: roomKey
        }])
      });
    }
   });
  });
 }

 createRoom() {
    this.addRoom();
    var uid = firebase.auth().currentUser.uid;
    var name = firebase.auth().currentUser.displayName;
    var database = firebase.database();
    var roomName = document.getElementById("roomname").value;
    var roomPW = document.getElementById("roompw").value;
    var privacy = document.getElementById("privacy").checked;
    var roomPush = database.ref().push();
    var roomKey = roomPush.key;
    var songs = database.ref('rooms/' + roomKey).set({
      roomname: roomName,
      password: roomPW,
      downvoters: '',
      songs: '',
      chats: '',
      privacy: privacy,
      admin: uid,
      users: '',
      downvotes: 0,
      numberOfUsers: 1
    });
    database.ref('rooms/' + roomKey +'/users').push(uid);
    var userID = firebase.auth().currentUser.uid;
    database.ref('users/' + userID ).push();
    database.ref('users/' + userID ).set({
      name: name
    });
    database.ref('users/' + userID + "/roomKeys").push();
    database.ref('users/' + userID + "/roomKeys").set({
      currentRoom: roomKey
    });
    console.log(userID);
 }


  componentDidMount() {
    setTimeout(this.getRoomList.bind(this), 1000);
  }

  render () {
    const {roomList} = this.state;

    return (
      <div className="sidenav">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button>
                <i className="fas fa-plus" onClick={()=> this.addRoom()}></i>
              </Button>
            </InputGroupAddon>
            <Input placeholder="Search Room Name" className="inlink" type="text" name="name" id="room" onChange={()=>this.searchRoom()}/>
          </InputGroup>
        <Modal isOpen={this.state.addingRoom} toggle={this.addRoom}>
          <ModalHeader toggle={this.addRoom}>Add New Room</ModalHeader>
          <ModalBody>
            <div className="addbox" id="addbox">
              <InputGroup>
                <InputGroupAddon addonType="prepend">Room Name</InputGroupAddon>
                <Input placeholder="" id="roomname"/>
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">Room Password</InputGroupAddon>
                <Input placeholder="" id="roompw"/>
              </InputGroup>

              <br/>
              <input id="privacy" name="private" type="checkbox"  /> Make Private
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" id="myBtn" onClick={()=> this.createRoom()}>Submit</Button>
            <Button color="secondary" onClick={this.addRoom}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <div className="sidescrollbox">
          <Table borderless id="roomList">
            {
              roomList.map((room) =>
                <tr>
                  <td>
                    <Button className="b_width" onClick={() => this.joinPublicRoom(room.roomKey)}>{room.roomName} </Button>

                  </td>
                </tr>
              )
            }
          </Table>
        </div>
      </div>
    );
  }
}

export default Sidenav;
