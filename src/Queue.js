import React, { Component } from 'react'
import "./Queue.css"
import firebase from 'firebase';

class Queue extends Component {
  constructor(props, context) {
      super(props);
      this.state = {
          musicQ: [{
            link: '',
            queueBy: ''
          }],
      };
      this.musicQueued = this.musicQueued.bind(this);
  }

  musicQueued() {
    var userID = firebase.auth().currentUser.uid;
    var getRoom = firebase.database().ref('users/' + userID + '/roomKeys');
    getRoom.once('value').then((snapshot) => {
      var roomKey = snapshot.val().currentRoom;
      console.log("roomKey: " + roomKey);
      var songLocation = firebase.database().ref('/rooms/' + roomKey + '/songs');
      songLocation.on('value', (song) => {
        let clear = [];
        this.setState({
          musicQ: clear
        })
        try {
          var keys = Object.keys(song.val());
        } catch(exception) {
          this.musicQueued();
        }
        song.forEach((childSnapshot) => {
          var songLink = childSnapshot.val().link;
          var queueBy = childSnapshot.val().queueBy;
          console.log('Queued By:' + queueBy )
          console.log("songLink: " + childSnapshot.val().link);
          this.setState({
						musicQ: this.state.musicQ.concat([{
			        link: songLink,
              queueBy: queueBy
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
    const {musicQ} = this.state;
    return (

      <div className="scrollbox">
      <table className="table">
        <tr>
          <th>Track Name</th>
          <th>Duration</th>
          <th>Queued by</th>
        </tr>
        {
            musicQ.map((song) =>
              <tr>
                <td className="tr2">
                  {song.link}
                </td>
                <td></td>
                <td className="tr2">
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
