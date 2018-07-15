//import React from 'react';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './Chat.css';
import firebase from 'firebase';

import Message from './Message.js';

class Chat extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            chats: [{
     			username:" "
     			//nothing so far. updates each time.
            }],
            userID: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {
    	var testRef = firebase.database().ref('/rooms/-LHUzP7MB-uDB_xJUGRq/chats/');
    	console.log('Testref: '+testRef);
		testRef.on('value', (snapshot) => {
			let chats = snapshot.val();
			console.log(chats);
			var keys = Object.keys(chats);
			console.log(keys);
			let newState = [];
			this.setState({
				chats: newState
			});
			for(var i =0; i<keys.length; i++){
				var k = keys[i];
				var message = chats[k].message;
				var user = chats[k].user;
				console.log(message);
				console.log(user);
				this.setState({
					chats: this.state.chats.concat([{
						username: user,
						content: message,
					}])
				}, () => {
					ReactDOM.findDOMNode(this.refs.msg).value = "";
				});
			}
   		});

		setTimeout(this.getUserID.bind(this), 1000);

        this.scrollToBot();
    }

    getUserID() {
   		var userID = firebase.auth().currentUser.uid;
    	this.setState({
    		userID: userID
    	})
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    handleChange(e){
    	this.setState = {
    		[e.target.name]: e.target.value
    	}
    }

    submitMessage(e) {
        // var userID = firebase.auth().currentUser.uid;
     	// var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
        e.preventDefault();
        var userMessage = document.getElementById("currentMessage").value;
        var userID = firebase.auth().currentUser.uid;
        var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
        userRoomKey.once('value').then(function(snapshot) {
            console.log("userID: " + userID);
            var roomKey = snapshot.val().currentRoom;
            console.log("RoomKey: " + roomKey)
            var chatbase = firebase.database().ref('rooms/' + roomKey + '/chats');
            chatbase.push({
                message: userMessage,
                user: userID,
            })
        });
    }

    render() {

        const { chats, userID} = this.state;
        console.log("now: " + userID);
        return (
            <div id="chatroom">
                <h3>Chatroom</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) => 
                            <li className={`chat ${ userID === chat.username ? "right" : "left"}`}>
						        <p>{chat.content}</p>
						    </li>
                        )
                    }
                </ul>
		        <div className="messagebox">
		        </div>

		        <form className="input" onSubmit={(e) => this.submitMessage(e)}>
	                    <input id="currentMessage" type="text" ref="msg" />
	                    <input type="submit" value="Submit" />
		        </form>
            </div>
        );
    }
}

export default Chat;
