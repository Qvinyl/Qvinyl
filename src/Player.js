import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './Player.css';
 
class Player extends Component {
	constructor () {
		super()
		this.state = {
			isHidden: true
		}
	}
	hideVideo () {
		this.setState({
			isHidden: !this.state.isHidden
		})
	}
	render () {
		return (
			<div className="player">
				<div className="controls">
					<a href="javascript():void();">
						<i className="fa fa-chevron-left"></i>
					</a>
					<a href="javascript():void();">
						<i className="fa fa-play"></i>
					</a>
					<a href="javascript():void();">
						<i className="fa fa-chevron-right"></i>
					</a>
					<a onClick={this.hideVideo.bind(this)}>
						<i className="fa fa-plus"></i>
					</a>
					
				</div>
				<div className="progress">
					<div className="bar">
					</div>
				</div>
				{!this.state.isHidden && <Video />}
			</div>
		);
	}
    
}

const Video = () => (
	<div className='video'>
		<ReactPlayer url='https://www.youtube.com/watch?v=fYn5-tW6y7o&start_radio=1&list=RDfYn5-tW6y7o' playing />
	</div>
)

export default Player;



	
