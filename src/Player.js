import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './Player.css';
 
class Player extends Component {
	constructor (props) {
		super(props)
		this.state = {
			hiddenVideo: true,
			hiddenAddSong: true,
			hiddenVolume: true,
			volume: 0.5,
			song: 'https://www.youtube.com/watch?v=jgMfYgsRvQ8',
			songQueue: ['https://www.youtube.com/watch?v=onbC6N-QGPc'],
			songBeingQueued: ''
		}
		
		// initialize helper functions
		this.hideVideo = this.hideVideo.bind(this)
		this.skipVideo = this.skipVideo.bind(this)
		
		this.hideAddSong = this.hideAddSong.bind(this)
		this.newSong = this.newSong.bind(this)
		this.addSongToQueue = this.addSongToQueue.bind(this)
		
		this.hideVolume = this.hideVolume.bind(this)
		this.changeVolume = this.changeVolume.bind(this)
	}
	
	// hide playing video
	hideVideo () {
		this.setState({
			hiddenVideo: !this.state.hiddenVideo
		})
	}	

	// skip current video
	skipVideo () {
		console.log(this.state.songQueue);
		this.setState({
			song: this.state.songQueue.shift()
		})
	}
	
	// hide add song button
	hideAddSong () {
		this.setState({
			hiddenAddSong: !this.state.hiddenAddSong
		})
	}
	
	// locate song queue
	newSong(event) {
		this.setState({
			songBeingQueued: event.target.value
		})
	}
	
	// add input song to queue array
	addSongToQueue () {
		// console.log(this.state.songBeingQueued);
		this.state.songQueue.push(this.state.songBeingQueued)
		this.setState(
			this.state
		)
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
					<a onClick={this.hideAddSong}>
						<i className="fa fa-plus"></i>
					</a>
					<a onClick={this.skipVideo}>
						<i className="fa fa-fast-forward"></i>
					</a>
					<a onClick={this.hideVolume}>
						<i className="fa fa-volume-down"></i>
					</a>
					<a onClick={this.hideVideo}>
						<i className="fa fa-video"></i>
					</a>
					
				</div>
						
				<div style={showAddSong}>
					<input type="text" placeHolder="URL" onChange={this.newSong}/>
					<button onClick={this.addSongToQueue}>
						Submit
					</button>
				</div>
				
				<div style={volumeSettings}>
					<input 
						type="range"
						min="0" max="1"
						value={this.state.volume}
						onInput={this.changeVolume}
						step="0.05" />
				</div>
				
				<div style={video}>
					<ReactPlayer 
						playing
						volume={this.state.volume}
						url={this.state.song}
						width="100%"
					/>
				</div>
			</div>
		);
	}
}

export default Player;
