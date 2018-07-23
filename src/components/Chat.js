//import React from 'react';
import React from 'react'
import ReactDOM from 'react-dom';
import './Chat.css';
import firebase from 'firebase';
import {
  TabContent, TabPane, Nav, NavItem, Form,
  NavLink, Card, Button, Row, Col, CardBody } from 'reactstrap';
import classnames from 'classnames';
import {Input, Table, Tooltip } from 'reactstrap'

class Chat extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            chats: [{
              username: '',
              displayName: '',
              content: ''
            }],
            userID: '',
            userList: [{
              name: '',
              id: '',
            }],
            displayName: '',
            collapse: false,
            activeTab: '1',
            hoveringKickUser: false,
            hoveringAdmin: false
        };

        this.hoverAdmin = this.hoverAdmin.bind(this);
        this.hoverKickUser = this.hoverKickUser.bind(this);
        this.toggle = this.toggle.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.loadChat = this.loadChat.bind(this);
        this.getUserID = this.getUserID.bind(this);
    }

    hoverAdmin() {
    this.setState({
      hoveringAdmin: !this.state.hoveringAdmin
    })
  }

    hoverKickUser() {
    this.setState({
      hoveringKickUser: !this.state.hoveringKickUser
    })
  }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
        this.getUserList();
      }
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    componentDidMount() {
        setTimeout(this.getUserID.bind(this), 500);
        this.scrollToBot();

    }

    getUserID() {
        try {
          var userID = firebase.auth().currentUser.uid;
        } catch(exception) {
          this.getUserID.bind(this);
        }
        this.setState({
          userID: userID
        });
        var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
        getRoom.on('value', (snapshot) => {
          try {
            var roomKey = snapshot.val().currentRoom;
          } catch (exception) {
            this.getUserID.bind(this);
          }
          if (roomKey !== undefined) this.loadChat(roomKey);
        });
    }


    loadChat(roomKey) {
      var chatLocation = firebase.database().ref('/rooms/' + roomKey + '/chats/');
      chatLocation.on('value', (chatHistory) => {

        let clear = [];
        this.setState({
          chats: clear
        });

        chatHistory.forEach((childSnapshot) => {
          var message = childSnapshot.val().message;
          var user = childSnapshot.val().user;
          var displayName = childSnapshot.val().name;
          this.setState({
            chats: this.state.chats.concat([{
              username: user,
              displayName: displayName,
              content: message,
            }])
          });
        });
      });
    }


    submitMessage(e) {
        e.preventDefault();
        var userMessage = document.getElementById("currentMessage").value;
        var userID = firebase.auth().currentUser.uid;
        var displayName = firebase.auth().currentUser.displayName;
        var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
        userRoomKey.once('value').then(function(snapshot) {
            var roomKey = snapshot.val().currentRoom;
            if (roomKey === "") {
              window.alert("you are not in a room");
              return;
            }
            var chatbase = firebase.database().ref('rooms/' + roomKey + '/chats');
            chatbase.push({
                message: userMessage,
                user: userID,
                name: displayName
            });
            document.getElementById("currentMessage").value = '';
        });
    }

    kickUser(uid) {
      var kickLink = uid;
      var userID = firebase.auth().currentUser.uid;
      var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
      userRoomKey.once('value').then(function(snapshot){
        var roomKey = snapshot.val().currentRoom;
        var adminLocation = firebase.database().ref('rooms/' + roomKey + '/admin');
        adminLocation.once('value').then((snapshot) => {
          var admin = snapshot.val();
          if (userID === admin) {
            var updateUsers = firebase.database().ref('rooms/' + roomKey + '/users');
            updateUsers.once('value').then((snapshot) => {
              snapshot.forEach((childSnapshot) => {
                var selectedUser = childSnapshot.val();
                var selectedUserKey = childSnapshot.key;
                if ( kickLink === selectedUser ) {
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
              });
            });
          }
          else{
            window.alert("You are not Admin");
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
          var userList = firebase.database().ref('/rooms/' + roomKey + '/users');
          userList.on('value', (user) => {
            this.setState({
              userList: []
            })
            user.forEach((childSnapshot) => {
              var id = childSnapshot.val();
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
        var makeAdmin = uid;
        var userID = firebase.auth().currentUser.uid;
        var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
        userRoomKey.once('value').then(function(snapshot){
          var roomKey = snapshot.val().currentRoom;
          var updateAdmin = firebase.database().ref('rooms/' + roomKey);
          var adminLocation = firebase.database().ref('rooms/' + roomKey + '/admin');
          adminLocation.once('value').then((snapshot) => {
            var admin = snapshot.val();
            if (userID === admin) {
              updateAdmin.push();
              updateAdmin.update({
                admin: makeAdmin
              });
            }
            else{
              window.alert("You are not Admin");
            }
          });
        });
      }

    render() {
        const { chats, userID, userList} = this.state;
        return (

          <div className="opacity">
      <Nav tabs style={{background:'' }}>
        <NavItem style={{height:"4vh", background:"#343a40", width:'50%', opacity: '0.8'}}>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }} style={{color: 'white', background: '#232323', border: '0px', borderRadius: '0px'}}
          >
            <span className="tabTitle">Chatroom</span>
          </NavLink>
        </NavItem>
        <NavItem style={{height:"4vh", background:"#343a40", width:'50%', opacity: '0.8'}}>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggle('2'); }} style={{color: 'white', background: '#232323', border: '0px', borderRadius: '0px'}}
          >
            <span className="tabTitle">Users</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <Row noGutters>
            <Col sm="12">
              <Card style={{border: '0px'}}>
                <div id="chatroom">
                  <div>
                    <ul className="chats" ref="chats">
                        {
                          chats.map((chat, index) =>
                              <li key={index} className={`chat ${ userID === chat.username ? "right" : "left"}`}>
                                <b>{chat.displayName}</b>
                                <br/>
                                <p>{chat.content}</p>
                            </li>
                          )
                        }
                    </ul>
                    <Form autoComplete="off" className="input" onSubmit={(e) => this.submitMessage(e)}>
                        <Input placeholder="Type a message..." id="currentMessage" type="text" ref="msg" />
                    </Form>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row noGutters>
            <Col sm="12">
              <Card style={{color: 'white', background: '#1c1f23', border: '0px', borderRadius: '0px', height:'100vh'}}>
                <CardBody>
                  <Table className="cardscrollbox">
                    <tbody>
                      {
                        userList.map((name, index) =>
                          <tr key={index}>
                            <td className="userNames">
                              {name.name}
                            </td>
                            <td>
                              <Button id="kickUserButton" style={{borderRadius:100, margin: "2px 2px 2px 2px"}}>
                                <i className="fas fa-frown-open" onClick={() => this.kickUser(name.id)} value = {name.id}></i>
                              </Button>
                              <Tooltip placement="top" isOpen={this.state.hoveringKickUser} target="kickUserButton" toggle={this.hoverKickUser}>
                                Kick Out User
                              </Tooltip>
                              {/*<Button className="userListButton" size="sm" outline color="primary" onClick={() => this.kickUser(name.id)} value = {name.id}> Kick User </Button>*/}
                            </td>
                            <td>
                              <Button id="adminButton" style={{borderRadius:100, margin: "2px 2px 2px 2px"}}>
                                <i className="fas fa-crown" onClick={() => this.makeAdmin(name.id)} value = {name.id}></i>
                              </Button>
                              <Tooltip placement="top" isOpen={this.state.hoveringAdmin} target="adminButton" toggle={this.hoverAdmin}>
                                Make User Admin
                              </Tooltip>
                              {/*<Button className="userListButton" size="sm" outline color="primary" onClick={() => this.makeAdmin(name.id)} value = {name.id}> Make Admin </Button>*/}
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      </div>


      );
    }
}

export default Chat;
