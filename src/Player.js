import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './Player.css';
 
class Player extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isHidden: true,
			song: 'https://www.youtube.com/watch?v=jgMfYgsRvQ8',
			songQueue: ['https://www.youtube.com/watch?v=PQSljVL5ARA',
						 'https://www.youtube.com/watch?v=m45dfKYezow',
						 'https://www.youtube.com/watch?v=6M78EWZlCvE',
						 'https://www.youtube.com/watch?v=7LEmer7wwHI',
						 'https://www.youtube.com/watch?v=hWUWXqa1w1Q']
		}
	}
	hideVideo () {
		this.setState({
			isHidden: !this.state.isHidden
		})
	}
	loadVideo () {
		this.setState({
			song: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
		})
	}
	newSong(event) {
		this.setState({
			song: event.target.value
		})
	}
	skipVideo () {
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
					<a onClick={this.skipVideo.bind(this)}>
						<i className="fa fa-chevron-right"></i>
					</a>
					<a onClick={this.hideVideo.bind(this)}>
						<i className="fa fa-plus"></i>
					</a>
					<a onClick={this.loadVideo.bind(this)}>
						<i className="fa fa-music"></i>
					</a>
					<input type="text" value={this.state.song} />
					<button onClick={this.newSong}>
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



	
