import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './Player.css';
import firebase from 'firebase'
import {
	Button,
	Navbar,
  	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';

function logoutButton(){
    firebase.auth().signOut();
}

class Player extends Component {
	constructor (props) {
		super(props);
		this.state = {
			mute: false,
			hiddenVideo: true,
			hiddenAddSong: true,
			hiddenVolume: true,
			volume: 0.5,
			played: 0,
			song: '',
			currentSongTitle: '',
			currentSongImage: '',
			currentUser: ''
		};

		// initialize helper functions
		this.onProgress = this.onProgress.bind(this);
		this.hideVideo = this.hideVideo.bind(this);
		this.skipVideo = this.skipVideo.bind(this);
		this.checkUserDownVote = this.checkUserDownVote.bind(this);
		this.hideVolume = this.hideVolume.bind(this);
		this.changeVolume = this.changeVolume.bind(this);
		this.incrementDownvotes = this.incrementDownvotes.bind(this);
		this.toggleMute = this.toggleMute.bind(this);
	}

	toggleMute () {
		this.setState({
			mute: !this.state.mute
		})
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
		if (roomKey == "") return;
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
					var songLink = childSnapshot.val().link;
					var songKey = childSnapshot.key;
					console.log("current song: " + this.state.song);
					console.log("next song: " + songLink.link);
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
	    try {
	     	var userID = firebase.auth().currentUser.uid;
	    } catch(exception) {
	        this.onPageLoad.bind(this);
	    }
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
					var songLink = childSnapshot.val().link;
					console.log("loaded song: " + songLink);
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
		    try {
		     	var userID = firebase.auth().currentUser.uid;
		    } catch(exception) {
		        this.onPageLoad.bind(this);
		    }
		    var userName = firebase.auth().currentUser.displayName;
		    console.log(userName);
		    this.setState({
				currentUser: userName
			});
		    var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
		    getRoom.once('value').then((snapshot) => {
				try {
					if(snapshot.val().currentRoom !== "") {
						var roomKey = snapshot.val().currentRoom;
					}
					else {
						return;
					}
				} catch (exception) {
					return;
				}
			    var songLocation = firebase.database().ref('rooms/' + roomKey + '/songs');
				songLocation.limitToFirst(1).once('value').then((snapshot) => {
					snapshot.forEach((childSnapshot) => {
						var songLink = childSnapshot.val().link;
						//console.log("loaded song interval: " + songLink);
						this.setState({
							song: songLink
						});
						      // get youtube ID
						var youtubeID = songLink.slice(songLink.lastIndexOf("=") + 1, songLink.length);
						var APIkey = 'AIzaSyA04eUTmTP3skSMcRXWeXlBNI0luJ2146c';
						var youtubeAPItitle = 'https://www.googleapis.com/youtube/v3/videos?key='
						              + APIkey + '&part=snippet&id=' + youtubeID;
		              	fetch(youtubeAPItitle).then((response) => response.json()).then((json) => {
	              	  		var title = json.items[0].snippet.title;
	              	  		var youtubeImgURL = 'https://img.youtube.com/vi/' + youtubeID + '/0.jpg';
							this.setState({
								currentSongTitle: title,
								currentSongImage: youtubeImgURL
							});
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
			height: this.state.hiddenVideo ? "15vh" : "100vh"
		};
		var showAddSong = {
			display: this.state.hiddenAddSong ? "none" : "block"
		};

		return (
			<div>
				<div className="banner">
					<div className="left">
						<img className="albumart" src={this.state.currentSongImage}/>
						<p className="songTitle">
							♫♪  Currently playing...
							<br />
							<b>{this.state.currentSongTitle}</b>
						</p>
						<a onClick={this.checkUserDownVote}>
							<i id="downvote" className="fas fa-fast-forward thumbsdown" ></i>
						</a>
					</div>

					<div className="center">
						<img className="logo" src="logo6.png"/>
					</div>

					<div className="right">
						<p className="userName">
							Welcome, <b>{this.state.currentUser}</b>
						</p>
						<Button style={{borderRadius:100}} href="login.html" onClick={logoutButton} className="logout">Logout</Button>
					</div>
		            <div>
						<progress className="progressBar"
							max='1'
							value={this.state.played}
						/>
					</div>
		        </div>

				<div className="player">
					<div className="controls">
						<a onClick={this.toggleMute}>
							<i className={"fas fa-volume-off muting" + (this.state.mute ? " show" : " hide")}></i>
						</a>
						<a onClick={this.toggleMute}>
							<i style={{marginRight:60}} className={"fas fa-volume-down muting" + (this.state.mute ? " hide" : " show")}></i>
						</a>
						<a onClick={this.hideVideo}>
							<i className="fas fa-arrows-alt fullScreen fa-rotate-45"></i>
						</a>
					</div>

					<div className="minimizedPlayer" style={video}>
						<div className="blur">
							<ReactPlayer
								ref={this.ref}
								playing={true}
								volume={this.state.volume}
								url={this.state.song}
								width="100vw"
								height="100vh"
								muted={this.state.mute}
								onProgress={this.onProgress}
								onEnded={this.skipVideo}
							/>
						</div>
					</div>

					{/*
					<a onClick={this.hideVolume}>
						<i className="fa fa-volume-down buttons"></i>
					</a>
					<div style={volumeSettings}>
						<input
							type="range"
							min="0" max="1"
							value={this.state.volume}
							onInput={this.changeVolume}
							step="0.05" />
					</div>
					*/}
				</div>
			</div>
		);
	}
}

export default Player;
