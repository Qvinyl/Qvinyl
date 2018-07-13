import React, { Component } from 'react'
import "./Info.css"
import firebase from 'firebase'
class Info extends Component {

    constructor(props) {
    super(props);
    this.state = {clicks: 0}
  }

  handleClick() {
    this.setState((prevState) => ({
        clicks: prevState.clicks + 1
    }));
  }


  incrementDownvotes() {
    var userID = firebase.auth().currentUser.uid;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then(function(snapshot){
      var roomKey = snapshot.val().currentRoom;
      console.log(roomKey)
      var downvoteLoc = firebase.database().ref('rooms').child(roomKey).child('downvotes');
      downvoteLoc.transaction(function(downvotes) {
         return (downvotes || 0) + 1;
      });
    });
  }


  render () {
    return (
        <div className="infobox">
          <div className="infobanner">
            <div className="infoTitle">Track Info </div>
            <div>
              <div className="vetobox">
                <div className="vetotext">Veto</div>


                <span className="counter" onClick={this.handleClick.bind(this)}> <span className="count">{this.state.clicks} </span>

                <i className="fas fa-thumbs-down thumbsi" onClick={()=> this.incrementDownvotes()}></i>
                </span>



              </div>
              <table className="table2">
                <tr>
                  <td className="info">Name: </td>
                  <td className="listing">Far Alone (Instrumental)</td>
                </tr>
                <tr>
                  <td className="info">Duration: </td>
                  <td className="listing"> 3:54</td>
                </tr>
                <tr>
                  <td className="info">Artist: </td>
                  <td className="listing">G-Eazy</td>
                </tr>
                <tr>
                  <td className="info">Link: </td>
                  <td className="listing"></td>
                </tr>
              </table>
            </div>
          </div>

        </div>

    );
  }
}

export default Info;
