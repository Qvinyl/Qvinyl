import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import {Container, Row, Col, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Table } from 'reactstrap'
import './Sidenav.css';
import firebase from 'firebase';

class Sidenav extends Component {
  constructor (props) {
    super(props);


    this.state = {
      hideAddRoom: true,

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



//  <InputGroup>
//     <InputGroupAddon addonType="prepend">♫♪</InputGroupAddon>
//     <Input placeholder="youtube.com" /> 
  
//    <Button outline color="primary"
//     className="inputB" id="myBtn" onClick={()=> this.pushMusicToDB()}>
//     Submit
//    </Button>
// </InputGroup>

  render () {
    var addButton = {
      display: this.state.hideAddRoom ? "none" : "block"
    }
    return (
      <div className="sidenav">
          <Row className="searchroom">
             <InputGroup>

              <i className="fas fa-plus-circle plus" id="plus" onClick={()=> this.addRoom()}></i>
             
               <Input placeholder="Search for Room Name..." className="inlink" type="text" name="name" id="room" onChange={()=>this.searchRoom()}/>
              </InputGroup>
          </Row>

         
                <div style={addButton} className="addbox" id="addbox">
                  <InputGroup>
                    <label className="linkT">
                      Room Name:
                    </label>
                        <Input className="inlink" id="roomname"/>
                  </InputGroup>
                  <InputGroup>
                      <label className="linkT">
                        Room password:
                      </label>
                      <Input className="inlink" id="roompw"/>
                  </InputGroup>
                      <Button className="inputB" id="myBtn" onClick={()=> this.createRoom()}>Submit</Button>
                </div>


            <div className="sidescrollbox">
              <Table borderless className="table1" id="roomList">
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
              </Table>
            </div>
      </div>
    );
  }
}

export default Sidenav;
