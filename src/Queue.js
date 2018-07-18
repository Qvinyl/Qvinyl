import React, { Component } from 'react'
import "./Queue.css"
import firebase from 'firebase';

class Queue extends Component {
  constructor(props, context) {
      super(props);
      this.state = {
          songQueue: [{
            link: '',
            queueBy: ''
          }],
      };
      this.musicQueued = this.musicQueued.bind(this);
  }

  musicQueued() {
    try {
      var userID = firebase.auth().currentUser.uid;
    } catch(exception) {
      this.musicQueued.bind(this);
    }
    var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
    getRoom.once('value').then((snapshot) => {
      try {
        var roomKey = snapshot.val().currentRoom;
      } catch (exception) {
        this.musicQueued.bind(this);
      }
      console.log("roomKey: " + roomKey);
      var songLocation = firebase.database().ref('/rooms/' + roomKey + '/songs');
      songLocation.on('value', (song) => {
        let clear = [];
        this.setState({
          songQueue: clear
        })
        try {
          var keys = Object.keys(song.val());
        } catch(exception) {
          this.musicQueued();
        }
        song.forEach((childSnapshot) => {
          var songLink = childSnapshot.val().link;
          var queueBy = childSnapshot.val().queueBy;
          var thumbnail = childSnapshot.val().thumbnail;
          var title = childSnapshot.val().title;
          this.setState({
						songQueue: this.state.songQueue.concat([{
			        link: songLink,
              queueBy: queueBy,
              thumbnail: thumbnail,
              title: title
						}])
					});
        });
      });
    });

  }

  componentDidMount() {
    setTimeout(this.musicQueued.bind(this), 1000);
  }

  render () {
    const {songQueue} = this.state;
    return (

      <div className="scrollbox">
      <table className="table">
        <tr>
          <th></th>
          <th>Track Name</th>
          <th>Duration</th>
          <th>Queued by</th>
        </tr>
        {
            songQueue.map((song) =>
              <tr>
                <td> 
                  <img 
                    src={song.thumbnail} 
                    height="100" width="150"
                  />
                </td>
                <td>
                  {song.title}
                </td>
                <td></td>
                <td>
                  {song.queueBy}
                </td>
              </tr>
            )
        }
      </table>
      </div>
    );
  }
}

export default Queue;
