import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './Player.css';
import firebase from 'firebase'

class Player extends Component {
	constructor (props) {
		super(props);
		this.state = {
			hiddenVideo: false,
			hiddenAddSong: true,
			hiddenVolume: true,
			volume: 0.5,
			played: 0,
			song: '',
		};

		// initialize helper functions
		this.onProgress = this.onProgress.bind(this);
		this.hideVideo = this.hideVideo.bind(this);
		this.skipVideo = this.skipVideo.bind(this);
		this.checkUserDownVote = this.checkUserDownVote.bind(this);
		this.hideVolume = this.hideVolume.bind(this);
		this.changeVolume = this.changeVolume.bind(this);
		this.incrementDownvotes = this.incrementDownvotes.bind(this);
	}

	onProgress (state) {
		this.setState(state)
	}

	incrementDownvotes() {
	    var userID = firebase.auth().currentUser.uid;
	    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
	    userRoomKey.once('value').then((snapshot) => {
			var roomKey = snapshot.val().currentRoom;
			var downvoteLocation = firebase.database().ref('rooms/'+roomKey);
			downvoteLocation.once('value').then((snapshot) => {
				var downvotes = snapshot.val().downvotes;
				var numUsers = snapshot.val().numberOfUsers;
				downvotes += 1;
				downvoteLocation.push();
				downvoteLocation.update({
			    	downvotes: downvotes
				});
				if (downvotes/numUsers >= 0.5) {
					this.skipVideo();
				 	this.setDownvotesToZ();
				}
			});
	  });
 	}



	checkUserDownVote() {
		var temp = false;
		var currUser = firebase.auth().currentUser;
		 var userID = firebase.auth().currentUser.uid;
		 console.log("displayname: " + currUser.displayName);
		 var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
		 userRoomKey.once('value').then((snapshot) => {
		 var roomKey = snapshot.val().currentRoom;
		 var downvotersLocation = firebase.database().ref('rooms/'+roomKey+"/downvoters");
		 downvotersLocation.once('value').then((snapshot) => {
			 var downvoter = snapshot.val();
			 var count = 0;
			 snapshot.forEach((childSnapshot) => {
				 var downvoter = childSnapshot.val();
				 count += 1;
				 console.log("child: " + childSnapshot.val())
					if (childSnapshot.val() === userID) {
							console.log("count: " + count);
							console.log(childSnapshot.val() === userID);
							temp = true;
							return true;
					}
				});
			 if(temp == false || downvoter === '') {
				 var downvotersLoc = firebase.database().ref('rooms/'+ roomKey + '/downvoters');
				 downvotersLoc.push(userID);
				 this.incrementDownvotes();
				 temp = true;
			 }
		 });
	 });
	}

	// hide playing video
	hideVideo () {
		this.setState({
			hiddenVideo: !this.state.hiddenVideo
		})
	}

	setDownvotesToZ() {
		var userID = firebase.auth().currentUser.uid;
		var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
		userRoomKey.once('value').then(function(snapshot){
			var roomKey = snapshot.val().currentRoom;
			firebase.database().ref('rooms/'+ roomKey).update({
				downvotes: 0,
				downvoters: ''
			});
		});
  }

  // skip current video
	skipVideo (){
		this.setDownvotesToZ();
		var userID = firebase.auth().currentUser.uid;
	    var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
	    getRoom.once('value').then((snapshot) => {
			var roomKey = snapshot.val().currentRoom;
			var songLocation = firebase.database().ref('rooms/' + roomKey + '/songs');
			songLocation.limitToFirst(1).once('value').then((snapshot) => {
				snapshot.forEach((childSnapshot) => {
					var songLink = childSnapshot.val();
					var songKey = childSnapshot.key;
					console.log("current song: " + this.state.song);
					console.log("next song: " + songLink);
					firebase.database().ref('rooms/' + roomKey + '/songs/' + songKey).remove();
					// handles duplicate song, song on load
					/*
					if (this.state.song === songLink) {
						songLocation.limitToFirst(1).once('value').then((snapshot) => {
							snapshot.forEach((childSnapshot) => {
								var nextSongLink = childSnapshot.val();
								var nextSongKey = childSnapshot.key;
								firebase.database().ref('rooms/' + roomKey + '/songs/' + nextSongKey).remove();
								this.setState({
									song: nextSongLink
								});
							});
						});
						return;
					}
					*/
					this.setState({
						song: songLink
					});
				});
			});
	    });
    }

	// hide volume settings
	hideVolume () {
		this.setState({
			hiddenVolume: !this.state.hiddenVolume
		})
	}

	// adjust volume according to slider
	changeVolume (event) {
		// console.log(this.state.volume)
		this.setState({
			volume: event.target.value
		})
	}

	onPageLoad () {
		var userID = firebase.auth().currentUser.uid;
	    var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
	    getRoom.once('value').then((snapshot) => {
			try {
				var roomKey = snapshot.val().currentRoom;
			} catch (exception) {
				return;
			}
			var songLocation = firebase.database().ref('rooms/' + roomKey + '/songs');
			songLocation.limitToFirst(1).once('value').then((snapshot) => {
				snapshot.forEach((childSnapshot) => {
					var songLink = childSnapshot.val();
					this.setState({
						song: songLink
					});
					var songProgress = firebase.database().ref('rooms/' + roomKey + '/songProgress');
					songProgress.once('value').then((snapshot) => {
						var currentProgress = snapshot.val();
						console.log("current progress: " + currentProgress);
						this.setState({
							played: currentProgress
						});
						this.player.seekTo(this.state.played);
					})
				});
			});
	    });

	 	setInterval(() => {
			var userID = firebase.auth().currentUser.uid;
		    var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
		    getRoom.once('value').then((snapshot) => {
				try {
					var roomKey = snapshot.val().currentRoom;
				} catch (exception) {
					return;
				}
			    var songLocation = firebase.database().ref('rooms/' + roomKey + '/songs');
				songLocation.limitToFirst(1).once('value').then((snapshot) => {
					snapshot.forEach((childSnapshot) => {
						var songLink = childSnapshot.val();
						this.setState({
							song: songLink
						});
					});
				});
				var songProgress = firebase.database().ref('rooms/' + roomKey);
				songProgress.update({
			    	songProgress: this.state.played
				});
		    });
	 	}, 500);
	}

  	componentDidMount() {
	 	setTimeout(this.onPageLoad.bind(this), 2000);

 	}

	ref = player => {
		this.player = player
	}

	render () {
		// initializing css style inject
		var video = {
			display: this.state.hiddenVideo ? "none" : "block"
		};
		var showAddSong = {
			display: this.state.hiddenAddSong ? "none" : "block"
		};
		var volumeSettings = {
			display: this.state.hiddenVolume ? "none" : "block"
		};

		return (
			<div className="player">
				<div className="controls">
					<a onClick={this.checkUserDownVote}>
						<i id = "downvote" className="fas fa-thumbs-down buttons" ></i>
					</a>
					<a onClick={this.middleOfSong}>
						<i className="fa fa-fast-forward buttons"></i>
					</a>
					<a onClick={this.hideVolume}>
						<i className="fa fa-volume-down buttons"></i>
					</a>
					<a onClick={this.hideVideo}>
						<i className="fa fa-video buttons"></i>
					</a>
				</div>

				<div style={volumeSettings}>
					<input
						type="range"
						min="0" max="1"
						value={this.state.volume}
						onInput={this.changeVolume}
						step="0.05" />
				</div>

				<br />

				<div>
					<progress
						max='1'
						value={this.state.played}
					/>
				</div>

				<div style={video}>
					<ReactPlayer
						ref={this.ref}
						playing={true}
						volume={this.state.volume}
						url={this.state.song}
						width="100%"
						onProgress={this.onProgress}
						onEnded={this.skipVideo}
					/>
				</div>
			</div>
		);
	}
}

export default Player;
