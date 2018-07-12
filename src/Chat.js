import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './Chat.css';
import firebase from 'firebase'
class Chat extends Component {
	constructor(){
		super();
	}
	loadMessages(){
		var callback = function(snap){
			var data = snap.val();
			//displayMessage(snap.key, data.text);
		};
		firebase.database().ref('/rooms/').limitToLast(12).on('child_added', callback);
		firebase.database().ref('/rooms/').limitToLast(12).on('child_changed', callback);
	} 
	//displayMessage(key, text){
		//var div = document.getElementById(key);

	//}
	pushMessage(){
		return firebase.database().ref('/rooms/').push({
			//name: getUserName();
			text: 'does this work',
			//profilePicUrl: getProfilePicUrl()
		}).catch(function(error){
			console.error('rror writing message to firebase database', error);
		});
	}
	getUserName(){
		return firebase.auth().currentUser.displayName;
	}
  render () {
    return (
      <div className="chatbar">
        <div className="chattitle">Chat Room</div>
        <div className="messagebox">
         <button className="inputB" id="submitBtn" onClick={()=> this.pushMessage()}>Submit</button>
        </div>
      </div>
    );
  }
}
var submitButtonElement = document.getElementById('submitBtn');
export default Chat;
