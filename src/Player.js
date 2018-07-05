import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './Player.css';
 
class Player extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isHidden: true,
			song: 'https://www.youtube.com/watch?v=jgMfYgsRvQ8',
			songQueue: ['https://www.youtube.com/watch?v=PQSljVL5ARA'],
			songBeingQueued: ''
		}
		this.newSong = this.newSong.bind(this)
		this.addSongToQueue = this.addSongToQueue.bind(this)
		this.skipVideo = this.skipVideo.bind(this)
		this.hideVideo = this.hideVideo.bind(this)
	}
	hideVideo () {
		this.setState({
			isHidden: !this.state.isHidden
		})
	}
	newSong(event) {
		this.setState({
			songBeingQueued: event.target.value
		})
	}
	addSongToQueue () {
		console.log(this.state.songBeingQueued);
		this.state.songQueue.push(this.state.songBeingQueued)
		this.setState(
			this.state
		)
	}
	skipVideo () {
		console.log(this.state.songQueue);
		this.setState({
			song: this.state.songQueue.shift()
		})
	}
	render () {
		var video = {
			display: this.state.isHidden ? "none" : "block"
		};
		
		return (
			<div className="player">
				<div className="controls">
					<a onClick={this.skipVideo}>
						<i className="fa fa-chevron-right"></i>
					</a>
					<a onClick={this.hideVideo}>
						<i className="fa fa-plus"></i>
					</a>
					<input type="text" onChange={this.newSong}/>
					<button onClick={this.addSongToQueue}>
						Submit
					</button>
				</div>
				
				<div className="progress">
					<div className="bar">
					</div>
				</div>
				
				<div style={video}>
					<ReactPlayer 
						playing
						controls
						url={this.state.song}
						width='100%'
					/>
				</div>
			</div>
		);
	}
}

export default Player;



	
