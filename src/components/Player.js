import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './Player.css';
import firebase from 'firebase/app'
import logo from './logo6.png';
import {
	Button
} from 'reactstrap';
import {Circle} from 'rc-progress';

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
			currentUser: '',
			pressDownButton: false,
			percentage: 0
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
		this.findDownvotePercentage = this.findDownvotePercentage.bind(this);
	}

	// accounts for userID issue, as page might grab userID before firebase can respond
	componentDidMount() {
		setTimeout(this.onPageLoad.bind(this), 2000);
	}

	// updates progress for video
	onProgress (state) {
		this.setState(state)
	}

	// toggles the state of mute
	toggleMute () {
		this.setState({
			mute: !this.state.mute
		})
	}

	// hide volume settings
	hideVolume () {
		this.setState({
			hiddenVolume: !this.state.hiddenVolume
		})
	}

	// adjust volume according to slider
	changeVolume (event) {
		this.setState({
			volume: event.target.value
		})
	}

	// hide playing video
	hideVideo () {
		this.setState({
			hiddenVideo: !this.state.hiddenVideo
		})
	}

	// two functions called on page load
	// update Song Progress and updates thumbnail and song name of currently playing song
	onPageLoad () {
		// finds current song link and updates video progress to resume
		// resume from either where everyone else is, or the last left off place when everyone leaves the room
		try {
			var userID = firebase.auth().currentUser.uid;
		} catch(exception) {
			this.onPageLoad.bind(this);
		}
		var userName = firebase.auth().currentUser.displayName;
		this.setState({
			currentUser: userName
		});
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
					this.setState({
						song: songLink
					});
					var songProgress = firebase.database().ref('rooms/' + roomKey + '/songProgress');
					songProgress.once('value').then((snapshot) => {
						var currentProgress = snapshot.val();
						this.setState({
							played: currentProgress
						});
						this.player.seekTo(this.state.played);
					})
				});
			});
		});

		// dynamically sends the progress of the video to the database
		// grabs the youtube id to update the current song that's playing, song name and thumbnail
		setInterval(() => {
			this.findDownvotePercentage();
			try {
				var userID = firebase.auth().currentUser.uid;
			} catch(exception) {
				this.onPageLoad.bind(this);
			}
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
						this.setState({
							song: songLink
						});
						// get youtube ID, find and set the song name and thumbnail
						var youtubeID = songLink.slice(songLink.lastIndexOf("=") + 1, songLink.length);
						var APIkey = 'AIzaSyBUXNmtcQ1epEEKF5f5RXbEmLw54kjAPY8';
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
				// dynamically update the song progress and store to database
				var songProgress = firebase.database().ref('rooms/' + roomKey);
				songProgress.update({
					songProgress: this.state.played
				});
			});
		}, 500);
	}

	// increments the number of downvotes and skips video when majority (>= 50%) is reached
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

	// check if downvote is has already been pressed, accesses lists of downvoted users in Firebase
	checkUserDownVote() {
		this.setState({
			pressDownButton: !this.state.pressDownButton
		})

		var temp = false;
		var userID = firebase.auth().currentUser.uid;
		var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
		userRoomKey.once('value').then((snapshot) => {
			var roomKey = snapshot.val().currentRoom;
			if (roomKey === "") return;
			var downvotersLocation = firebase.database().ref('rooms/'+ roomKey +"/downvoters");
			downvotersLocation.once('value').then((snapshot) => {
				var downvoter = snapshot.val();
				snapshot.forEach((childSnapshot) => {
					if (childSnapshot.val() === userID) {
						temp = true;
						return true;
					}
				});
				if(temp === false || downvoter === '') {
					var downvotersLoc = firebase.database().ref('rooms/'+ roomKey + '/downvoters');
					downvotersLoc.push(userID);
					this.incrementDownvotes();
					temp = true;
				}
			});
		});
	}

	// resets the downvotes when song ahs skipped
	setDownvotesToZ() {
		var userID = firebase.auth().currentUser.uid;
		var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
		userRoomKey.once('value').then((snapshot) => {
			var roomKey = snapshot.val().currentRoom;
			firebase.database().ref('rooms/'+ roomKey).update({
				downvotes: 0,
				downvoters: ''
			});
		});
	}

	// skip current video by pushing next song in the queue to replace current song
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
					firebase.database().ref('rooms/' + roomKey + '/songs/' + songKey).remove();
					this.setState({
						song: songLink
					});
				});
			});
		});
	}

	// finds the percentage towards a skip for downvotes
	// displays on circular progress bar
	findDownvotePercentage () {
		try {
			var userID = firebase.auth().currentUser.uid;
		} catch (exception) {
			return;
		}
		var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
		userRoomKey.once('value').then((snapshot) => {
			try {
				var roomKey = snapshot.val().currentRoom;
			} catch (exception) {
				return;
			}
			var roomLocation = firebase.database().ref('rooms/' + roomKey);
			roomLocation.once('value').then((snapshot) => {
				try {
					var numUsers = snapshot.val().numberOfUsers;
					var downvotes = snapshot.val().downvotes;
					var percentage = (downvotes/(numUsers/2)) * 100;
					this.setState({
						percentage: percentage
					})
				} catch (exception) {
					return;
				}
			});
		});
	}

	// player reference from youtube player
	ref = player => {
		this.player = player
	}

	render () {
		// initializing css style inject
		var video = {
			height: this.state.hiddenVideo ? "35vh" : "100vh"
		};
		var hideSkipButton = {
			display: this.state.hiddenVideo ? "block" : "none"
		}

		return (
			<div>
				<div className="banner">
					<div className="left">
						<img className="albumart" src={this.state.currentSongImage} alt=""/>
						{
							this.state.currentSongTitle &&
							<div className="songTitle">
								<p className="currentPlay">
									♫♪  Currently playing...
								</p>

								<br />
								<marquee width="300px" behavior="scroll" direction="left" scrollamount="6">
									{this.state.currentSongTitle}
								</marquee>
							</div>
						}
					</div>
					<div className="center">
						<img src={logo} alt="Logo" className='logo' />
					</div>
					<div className="right">
						<p className="userName">
							Welcome, <b>{this.state.currentUser}</b>
						</p>
						<Button style={{borderRadius:100}} onClick={logoutButton} className="logout">Logout</Button>
					</div>
					<div>
						<progress className="progressBar"
						max='1'
						value={this.state.played}
						/>
					</div>
				</div>

				<div className="player">
					<div className="right">
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
					<div className="skipDiv">
						<a style={hideSkipButton} onClick={this.checkUserDownVote}>
						<Circle
						style={hideSkipButton}
						className="skipProgress"
						percent={this.state.percentage}
						strokeWidth="6"
						strokeColor="lightgrey"/>
							<i id="downvote" className="fas fa-fast-forward thumbsdown" ></i>
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
				</div>
			</div>
		);
	}
}

export default Player;
