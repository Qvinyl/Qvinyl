import React, { Component } from 'react'
import './Sidenav.css';
import { Scrollbars } from 'react-custom-scrollbars';

import {
    Table, Modal, ModalBody, Button, Input,
    InputGroup, InputGroupAddon, Tooltip } from 'reactstrap'
import firebase from 'firebase/app';

class Sidenav extends Component {
    constructor (props) {
        super(props);
        this.state = {
            roomList: [{
                roomName: '',
                roomKey: '',
            }],
            hoveringAdd: false,
            hoveringJoin: false,
            addingRoom: false,
            joiningRoom: false
        };
        this.hoverAdd = this.hoverAdd.bind(this);
        this.hoverJoin = this.hoverJoin.bind(this);
        this.addRoom = this.addRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
    }

    // accounts for userID issue, as page might grab userID before firebase can respond
    componentDidMount() {
        setTimeout(this.getRoomList.bind(this), 1000);
    }

    // hover tooltip for add room button
    hoverAdd() {
        this.setState({
            hoveringAdd: !this.state.hoveringAdd
        })
    }

    // hover tooltip for join room button
    hoverJoin() {
        this.setState({
            hoveringJoin: !this.state.hoveringJoin
        })
    }

    // modal for add room button
    addRoom() {
        this.setState({
            addingRoom: !this.state.addingRoom
        })
    }

    // modal for join room button
    joinRoom() {
        this.setState({
            joiningRoom: !this.state.joiningRoom
        })
    }

    // check of room key is valid before joining
    checkValidKey() {
        var link = document.getElementById("linkOfRoom").value;
        var rooms = firebase.database().ref('rooms/');
        rooms.once('value').then((snapshot) => {
            snapshot.forEach((room) => {
                if (link === room.key) {
                    this.joinPrivateRoom();
                    return true;
                }
            });
        });
    }

    // joins a private room or any room given a room key, sets currentRoom of user to room key
    joinPrivateRoom() {
        this.joinRoom();
        var temp = false;
        var link = document.getElementById("linkOfRoom").value;
        if (link === "") {
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
                if (childSnapshot.val() === userID) {
                    temp = true;
                    return true;
                }
            });
            if (temp === false) {
                updateUsers.push(userID);
                var numUsers = firebase.database().ref('rooms').child(link).child('numberOfUsers');
                numUsers.transaction(function(numberOfUsers) {
                    return (numberOfUsers || 0) + 1;
                });
            }
        });
    }

    // joins a public room so clicking on a room can set currentRoom of user to clicked room
    joinPublicRoom(roomKey) {
        this.leaveRoom();
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
                if (childSnapshot.val() === userID) {
                    temp = true;
                    return true;
                }
            });
            if (temp === false) {
                updateUsers.push(userID);
                var numUsers = firebase.database().ref('rooms').child(roomKey).child('numberOfUsers');
                numUsers.transaction(function(numberOfUsers) {
                    return (numberOfUsers || 0) + 1;
                });
            }
        });
    }

    // leaves room by deleting current room from current user
    leaveRoom() {
        try {
            var userID = firebase.auth().currentUser.uid;
        } catch(exception) {
            this.getUserList.bind(this);
        }
        var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
        getRoom.once('value').then((snapshot) => {
            try {
                var roomKey = snapshot.val().currentRoom;
            } catch (exception) {
                this.leaveRoom.bind(this);
            }
            var userList = firebase.database().ref('/rooms/' + roomKey + '/users');
            userList.once('value').then((user) => {
                user.forEach((childSnapshot) => {
                    var userKey = childSnapshot.key;
                    var id = childSnapshot.val();
                    if(id === userID) {
                        var numUsers = firebase.database().ref('rooms').child(roomKey).child('numberOfUsers');
                        numUsers.transaction(function(numberOfUsers) {
                            return (numberOfUsers || 0) - 1;
                        });
                        firebase.database().ref('/rooms/' + roomKey + '/users/' + userKey).remove();
                        return true;
                    }
                });
            });
        });
    }

    // grabs the list of rooms in room branch dynamically
    getRoomList() {
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
                if (privacy === false) {
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

    // creation of room, pushing intialized data into database
    createRoom() {
        this.addRoom();
        var uid = firebase.auth().currentUser.uid;
        var name = firebase.auth().currentUser.displayName;
        var database = firebase.database();
        var roomName = document.getElementById("roomname").value;
        var privacy = document.getElementById("privacy").checked;
        var roomPush = database.ref().push();
        var roomKey = roomPush.key;
        database.ref('rooms/' + roomKey).set({
            roomname: roomName,
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
    }

    render () {
        const {roomList} = this.state;

        return (
            <div className="sidenav">
                <div>
                    <h3 className="navTitle"> ROOMS </h3>
                    <div className="navButtons">

                        {/****************** TOOLTIP FOR ADD ROOM ******************/}
                        <Button id="addButton" style={{borderRadius:100, margin: "2px 2px 2px 2px"}} onClick={()=> this.addRoom()}>
                            <i className="fas fa-plus"> </i>
                        </Button>
                        <Tooltip placement="bottom" isOpen={this.state.hoveringAdd} target="addButton" toggle={this.hoverAdd}>
                            Add Room
                        </Tooltip>

                        {/****************** TOOLTIP FOR JOIN ROOM ******************/}
                        <Button id="joinButton" style={{borderRadius:100, margin: "2px 2px 2px 2px"}} onClick={()=> this.joinRoom()}>
                            <i className="fas fa-door-open"></i>
                        </Button>
                        <Tooltip placement="bottom" isOpen={this.state.hoveringJoin} target="joinButton" toggle={this.hoverJoin}>
                            Join Room
                        </Tooltip>
                    </div>
                </div>
                <br />
                <hr color="white" />
                {/***************** MODAL FOR ADD ROOM *****************/}
                <Modal className="addRoomBox" isOpen={this.state.addingRoom} toggle={this.addRoom}>
                    <ModalBody className="modalBody">
                        <h3 className="joinTitle"> <i className="fas fa-plus"></i>   ADD NEW ROOM </h3>
                        <br />
                        <div className="addbox" id="addbox">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Room Name</InputGroupAddon>
                                <Input placeholder="" id="roomname"/>
                            </InputGroup>
                            <br />
                            <br/>
                            <input id="privacy" name="private" type="checkbox"  />
                            <span style={{color:"white"}}>   Make Private </span>
                            <br/>
                            <Button color="primary" id="addSubmit" onClick={()=> this.createRoom()}>Submit</Button>
                            <Button color="secondary" id="addCancel" onClick={this.addRoom}>Cancel</Button>
                        </div>
                    </ModalBody>
                </Modal>

                {/***************** MODAL FOR JOIN ROOM *****************/}
                <Modal className="joinRoomBox" isOpen={this.state.joiningRoom} toggle={this.joinRoom}>
                    <ModalBody className="joinModalBody">
                        <h3 className="joinTitle"> <i className="fas fa-door-open"></i>   JOIN A ROOM </h3>
                        <br />
                        <div className="addbox" id="addbox">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Key</InputGroupAddon>
                                <Input placeholder="Paste Desired Room Key Here" id="linkOfRoom"  />
                            </InputGroup>
                            <br/>
                            <Button color="primary" id="addSubmit" onClick={()=> this.checkValidKey()}>Join</Button>
                            <Button color="secondary" id="addCancel" onClick={this.joinRoom}>Cancel</Button>
                        </div>
                    </ModalBody>
                </Modal>


                <Scrollbars className="sidescrollbox" style={{height:"70vh"}}>
                    <Table borderless id="roomList">
                        <tbody>
                        {
                            roomList.map((room, index) =>
                                <tr key={index}>
                                    <td className="hovering" onClick={() => this.joinPublicRoom(room.roomKey)}>
                                        <a className="b_width">{room.roomName} </a>
                                    </td>
                                </tr>
                        )}
                        </tbody>
                    </Table>
                </Scrollbars>
            </div>
        );
    }
}

export default Sidenav;
