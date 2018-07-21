//import React from 'react';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './Chat.css';
import firebase from 'firebase';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {Container, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Table } from 'reactstrap'

import Message from './Message.js';

class Chat extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            chats: [{
     			      username:" "
     			//nothing so far. updates each time.
            }],
            userID: '',
            userList: [{
              name: '',
              id: '',
            }],
            displayName: '',
            collapse: false,
        };

        this.toggle = this.toggle.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.checkInRoom = this.checkInRoom.bind(this);
        this.getUserList = this.getUserList.bind(this);
    }

    toggle() {
      this.setState({ collapse: !this.state.collapse });
      this.getUserList();
    }

    componentDidMount() {
		setTimeout(this.getUserID.bind(this), 1000);
        this.scrollToBot();
    }

    checkInRoom() {
    	var successful = false;
    	var intervalID = setInterval(() => {
    		try {
    			var userID = firebase.auth().currentUser.uid;
    			successful = true;
    		} catch(exception) {
    			console.log("unsuccessful");
    		}
		}, 500);
  		if (successful) {
  			clearInterval(intervalID);
  			return true;
  		}
    }

    getUserID() {
        try {
   		   var userID = firebase.auth().currentUser.uid;
        } catch(exception) {
            this.getUserID.bind(this);
        }
    	this.setState({
    		userID: userID
    	})
    	var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
    	getRoom.once('value').then((snapshot) => {
    		var count = 0;
    		try {
				var roomKey = snapshot.val().currentRoom;
			} catch (exception) {
				this.getUserID();
			}
			var chatLocation = firebase.database().ref('/rooms/' + roomKey + '/chats/');
			chatLocation.on('value', (snapshot) => {
				let chats = snapshot.val();
				try {
					var keys = Object.keys(chats);
				} catch (exception) {
					return;
				}
				let clear = [];
				this.setState({
					chats: clear
				});
				for(var i = 0; i < keys.length; i++){
					var k = keys[i];
					var message = chats[k].message;
					var user = chats[k].user;
					var displayName = chats[k].name;
					this.setState({
						chats: this.state.chats.concat([{
							username: user,
							displayName: displayName,
							content: message,
						}])
					}, () => {
						ReactDOM.findDOMNode(this.refs.msg).value = "";
					});
				}
	   		});
	    });
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();
        var userMessage = document.getElementById("currentMessage").value;
        var userID = firebase.auth().currentUser.uid;
        var displayName = firebase.auth().currentUser.displayName;
        var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
        userRoomKey.once('value').then(function(snapshot) {
            console.log("userID: " + userID);
            var roomKey = snapshot.val().currentRoom;
            if (roomKey == "") {
              window.alert("you are not in a room");
              return;
            }
            console.log("RoomKey: " + roomKey)
            var chatbase = firebase.database().ref('rooms/' + roomKey + '/chats');
            chatbase.push({
                message: userMessage,
                user: userID,
                name: displayName
            })
        });
    }

    kickUser(uid) {
      var isAdmin = false;
      var kickLink = uid;
      var userID = firebase.auth().currentUser.uid;
      var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
      userRoomKey.once('value').then(function(snapshot){
        var roomKey = snapshot.val().currentRoom;
        var adminLocation = firebase.database().ref('rooms/' + roomKey + '/admin');
        adminLocation.once('value').then((snapshot) => {
          var admin = snapshot.val();
          console.log('admin: ' + admin);
          if (userID == admin) {
            isAdmin = true;
            console.log("am I admin? " + isAdmin);
            var updateUsers = firebase.database().ref('rooms/' + roomKey + '/users');
            updateUsers.once('value').then((snapshot) => {
              snapshot.forEach((childSnapshot) => {
                var selectedUser = childSnapshot.val();
                var selectedUserKey = childSnapshot.key;
                if ( kickLink == selectedUser ) {
                  window.alert(kickLink + " has been removed from the room");
                  firebase.database().ref('rooms/' + roomKey + '/users/' + selectedUserKey).remove();
                  var getRoom = firebase.database().ref('users/' + kickLink + '/roomKeys');
                  getRoom.update({
                    currentRoom: ''
                  })
                  var numUsers = firebase.database().ref('rooms').child(roomKey).child('numberOfUsers');
                  numUsers.transaction(function(numberOfUsers) {
                    return (numberOfUsers || 0) - 1;
                  });
                }
                console.log("selectedUser: " + selectedUser);
              });
            });
          }
          else{
            console.log("You are not admin");
          }
        });
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
          var userList = firebase.database().ref('/rooms/' + roomKey + '/users');
          userList.on('value', (user) => {
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
      }

      makeAdmin(uid) {
        var isAdmin = false;
        var makeAdmin = uid;
        console.log("make Admin: " + makeAdmin);
        var userID = firebase.auth().currentUser.uid;
        var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
        userRoomKey.once('value').then(function(snapshot){
          var roomKey = snapshot.val().currentRoom;
          var updateAdmin = firebase.database().ref('rooms/' + roomKey);
          var adminLocation = firebase.database().ref('rooms/' + roomKey + '/admin');
          adminLocation.once('value').then((snapshot) => {
            var admin = snapshot.val();
            console.log('admin: ' + admin);
            if (userID == admin) {
              isAdmin = true;
              console.log("am I admin? " + isAdmin);
              updateAdmin.push();
              updateAdmin.update({
                admin: makeAdmin
              });
              console.log("admin is now ": admin);
            }
            else{
              console.log("You are not admin");
            }
          });
        });
      }

    render() {
        const { chats, userID, displayName, userList} = this.state;
        return (

            <div id="chatroom">

            <div>
              <Button color="primary" onClick={this.toggle} style={{ marginBottom: '0,5rem'}}>Users</Button>
              <Collapse isOpen={this.state.collapse}>
                <Card style={{background: "transparent"}}>
                      <Table className="cardscrollbox">
                       {
                           userList.map((name) =>
                             <tr>
                               <td className="userNames">
                                 {name.name}
                               </td>
                               <td>
                                 <Button className="userListButton" size="sm" outline color="primary" onClick={() => this.kickUser(name.id)} value = {name.id}> Kick User </Button>
                               </td>
                               <td>
                                 <Button className="userListButton" size="sm" outline color="primary" onClick={() => this.makeAdmin(name.id)} value = {name.id}> Make Admin </Button>
                               </td>
                             </tr>
                           )
                       }
                     </Table>
                </Card>
              </Collapse>
            </div>

            <div>
              <h3>Chatroom</h3>
              <ul className="chats" ref="chats">
                  {
                    chats.map((chat) =>
                        <li className={`chat ${ userID === chat.username ? "right" : "left"}`}>
                          <b>{chat.displayName}</b>
                          <br/>
            			        <p>{chat.content}</p>
            			    </li>
                    )
                  }
              </ul>
  		        <form className="input" onSubmit={(e) => this.submitMessage(e)}>
  	                    <input id="currentMessage" type="text" ref="msg" />
  	                    <input type="submit" value="Submit" />
  		        </form>
            </div>
          </div>
        );
    }
}

export default Chat;
