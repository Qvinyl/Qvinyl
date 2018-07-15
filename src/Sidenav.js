import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './Sidenav.css';
import firebase from 'firebase';

class Sidenav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hideAddRoom: true
    };
  }

  addRoom() {
    this.setState({
      hideAddRoom: !this.state.hideAddRoom
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

 createRoom() {
   var uid = firebase.auth().currentUser.uid;
    var database = firebase.database();
    var roomName = document.getElementById("roomname").value;
    var roomPW = document.getElementById("roompw").value;
    var roomPush = database.ref().push();
    var roomKey = roomPush.key;
    var songs = database.ref('rooms/' + roomKey).set({
      roomname: roomName,
      password: roomPW,
      downvoters: '',
      songs: '',
      chats: '',
      admin: uid,
      users: '',
      downvotes: 0,
      numberOfUsers: 1
    });
    database.ref('rooms/' + roomKey +'/users').push(uid);
    var userID = firebase.auth().currentUser.uid;
    database.ref('users/' + userID + "/roomKeys").push();
    database.ref('users/' + userID + "/roomKeys").set({
      currentRoom: roomKey
    });
    console.log(userID);
 }

  render () {
    var addButton = {
      display: this.state.hideAddRoom ? "none" : "block"
    }
    return (
      <div className="sidenav">
        <div className="searchroom">
          <i className="fas fa-plus-circle plus" id="plus" onClick={()=> this.addRoom()}></i>
          <input className="inlink" type="text" name="name" id="room" onChange={()=>this.searchRoom()}/>
        </div>
        <div style={addButton} className="addbox" id="addbox">
          <label className="linkT">
            Room Name:
          </label>
          <input className="inlink" id="roomname"/>
          <label className="linkT">
            Room password:
          </label>
          <input className="inlink" id="roompw"/>
          <button className="inputB" id="myBtn" onClick={()=> this.createRoom()}>Submit</button>

        </div>
        <div className="sidescrollbox">
          <table className="table1" id="roomList">
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Audio room </td>
            </tr>
            <tr>
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
            </tr>
            <tr>
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
            </tr>
            <tr>
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
            </tr>
            <tr>
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
            </tr>
            <tr>
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default Sidenav;
