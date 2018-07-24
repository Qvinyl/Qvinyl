import React, { Component } from 'react'
import Queue from './Queue'
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tooltip} from 'reactstrap'
import {
  Button,
  Table,
  Modal,
  ModalBody,
} from 'reactstrap'

import firebase from 'firebase/app'
import './Queue.css';

import {parse, toSeconds} from 'iso8601-duration';

import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './search_bar.js'
const API_KEY = 'AIzaSyA04eUTmTP3skSMcRXWeXlBNI0luJ2146c';


class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roomTitle: '',
      currentRoomKey: '',
      videos: [],
      selectedVideo: '',
      youtubeOpen: false,
      hoveringKey: false,
      hoveringSearch: false,
      hoveringDelete: false,
      deletingRoom: false
    };
    this.deleteRoom = this.deleteRoom.bind(this)
    this.hoverKey = this.hoverKey.bind(this);
    this.hoverSearch = this.hoverSearch.bind(this);
    this.hoverDelete = this.hoverDelete.bind(this);
    this.getRoomKey = this.getRoomKey.bind(this);
    this.getRoomName = this.getRoomName.bind(this);
    this.openYoutubeSearch = this.openYoutubeSearch.bind(this);

    this.videoSearch('lofi');
  }

  hoverKey() {
    this.setState({
      hoveringKey: !this.state.hoveringKey
    })
  }


  hoverSearch() {
    this.setState({
      hoveringSearch: !this.state.hoveringSearch
    })
  }

  hoverDelete() {
    this.setState({
      hoveringDelete: !this.state.hoveringDelete
    })
  }

  deleteRoom() {
    this.setState({
      deletingRoom: !this.state.deletingRoom
    })
  }

  pushMusicToDB(link) {
    var userID = firebase.auth().currentUser.uid;
    var name = firebase.auth().currentUser.displayName;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then(function(snapshot){
      var roomKey = snapshot.val().currentRoom;
      if (roomKey === "") {
        return;
      }
      var songLocation = firebase.database().ref('rooms/' + roomKey + '/songs');

      // get youtube ID
      var position = link.lastIndexOf("=");
      var youtubeID = link.slice(position + 1, link.length);
      var youtubeImgURL = 'https://img.youtube.com/vi/' + youtubeID + '/0.jpg';
      var youtubeAPItitle = 'https://www.googleapis.com/youtube/v3/videos?key='
                      + API_KEY + '&part=snippet&id=' + youtubeID;
      var youtubeAPIduration = 'https://www.googleapis.com/youtube/v3/videos?key='
      + API_KEY + '&part=contentDetails&id=' + youtubeID;

      if (link.includes("https://www.youtube.com/")
        || link.includes("https://soundcloud.com/")
        || link.includes("https://vimeo.com/")) {
        fetch(youtubeAPItitle).then((response) => response.json()).then((json) => {
          var title = json.items[0].snippet.title;
          fetch(youtubeAPIduration).then((response) => response.json()).then((json) => {
            var duration = json.items[0].contentDetails.duration;

            // parsing duration
            if (duration === "PT0S") {
              duration = "Stream";
            } else {
              duration = toSeconds(parse(duration));
              duration = Number(duration);
              var hours = Math.floor(duration / 3600);
              var mins = Math.floor(duration % 3600 / 60);
              var secs = Math.floor(duration % 3600 % 60);
              duration = (hours > 0 ? (hours < 10 ? "0" + hours : hours) + ":" : "")
                + (mins > 0 ? (mins < 10 ? "0" + mins : mins) + ":" : (hours > 0 ? "00:" : "0:"))
                + (secs > 0 ? (secs < 10 ? "0" + secs : secs) : "00");
            }

            songLocation.push({
              queueBy: name,
              link: link,
              thumbnail: youtubeImgURL,
              title: title,
              duration: duration
            });
          });
        })
      }
    });
  }

  getRoomKey() {
    var userID = firebase.auth().currentUser.uid;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then((snapshot) => {
      try {
        var roomKey = snapshot.val().currentRoom;
        this.setState({
          currentRoomKey: roomKey
        })
      } catch (exception) {
        this.getRoomKey.bind(this);
      }
    });

    // copy to ClipBoard
    var textField = document.createElement('textarea');
    textField.innerText = this.state.currentRoomKey;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  getRoomName() {
    var userID = firebase.auth().currentUser.uid;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.on('value', (snapshot) => {
      try {
        var roomKey = snapshot.val().currentRoom;
      } catch (exception) {
        this.getRoomName.bind(this);
      }
      var roomLocation = firebase.database().ref('rooms/' + roomKey);
      roomLocation.once('value').then((snapshot) => {
        try {
          var roomTitle = snapshot.val().roomname;
        } catch (exception) {
          this.getRoomName.bind(this);
        }
        this.setState({
          roomTitle: roomTitle
        });
      });
    });
  }

  destroyRoom() {
    var userID = firebase.auth().currentUser.uid;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then(function(snapshot){
      var roomKey = snapshot.val().currentRoom;
      var adminLocation = firebase.database().ref('rooms/' + roomKey + '/admin');
      adminLocation.once('value').then((snapshot) => {
        var admin = snapshot.val();
        if (userID === admin) {
          var peopleInRoom = firebase.database().ref('rooms/' + roomKey + '/users');
          peopleInRoom.once('value').then((users) => {
            users.forEach((user) => {
              var uid = user.val();
              firebase.database().ref('users/' + uid + "/roomKeys").push();
              firebase.database().ref('users/' + uid + "/roomKeys").set({
                currentRoom: ''
              });
            })
          });
          firebase.database().ref('rooms/' + roomKey).remove();
        }
        else{
          window.alert("You are not admin");
        }
      });
    });
  }

  componentDidMount() {
    setTimeout(this.getRoomName.bind(this), 1000);
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos
      });
    });
  }

  openYoutubeSearch() {
    this.setState({
      youtubeOpen: !this.state.youtubeOpen
    });
  }

  render () {
    const {videos} = this.state;

    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);


    return (
      <div className="main">

          <div className="mainButton">
          {/**********************************  TOOLTIPS  **********************************/}
            {/****************** TOOLTIP FOR ROOM KEY ******************/}
            {
                this.state.currentRoomKey &&
                <div>
                    <Button id="keyButton" style={{borderRadius:100, margin: "2px 2px 2px 2px"}}>
                      <i className="fas fa-key roomKey" onClick={this.getRoomKey}></i>
                    </Button>
                    <Tooltip placement="bottom" isOpen={this.state.hoveringKey} target="keyButton" toggle={this.hoverKey}>
                      Click to Copy to ClipBoard
                    </Tooltip>

                  {/****************** TOOLTIP FOR SEARCH MUSIC ******************/}
                    <Button id="searchButton" style={{borderRadius:100, margin: "2px 2px 2px 2px"}}>
                      <i className="fas fa-search searchSong" onClick={this.openYoutubeSearch}></i>
                    </Button>
                    <Tooltip placement="bottom" isOpen={this.state.hoveringSearch} target="searchButton" toggle={this.hoverSearch}>
                      Search Music
                    </Tooltip>

                  {/****************** TOOLTIP FOR DELETE ROOM ******************/}
                  <Button id="deleteButton" style={{borderRadius:100, margin: "2px 2px 2px 2px"}}>
                    <i className="fas fa-times removeRoom" onClick={this.deleteRoom}></i>
                  </Button>
                  <Tooltip placement="bottom" isOpen={this.state.hoveringDelete} target="deleteButton" toggle={this.hoverDelete}>
                    Delete Room
                  </Tooltip>
               </div>
            }

          {/**********************************  MODAL BOXES  **********************************/}
             {/***************** MODAL FOR SEARCH MUSIC *****************/}
            <Modal className="searchBox" isOpen={this.state.youtubeOpen} toggle={this.openYoutubeSearch}>
              <ModalBody className="searchBody">
                <h3 className="searchTitle">  <i className="fas fa-search searchSong"></i>  SEARCH MUSIC:  </h3>
                <div>
                  <SearchBar onSearchTermChange={videoSearch} />
                  <Table className="col-md-4 list-group">
                    <tbody>
                        {
                          videos.map((video, index) =>
                            <tr key={index} className="rowDivider">
                              <td>
                                <img src={video.snippet.thumbnails.default.url} alt="thumbnail" />
                              </td>
                              <td className="songTitle" style={{width: '100%'}}>
                                {video.snippet.title}
                                <br/>
                              </td>

                              <td>
                               <Button style={{borderRadius:100, margin: "2px 2px 2px 2px"}}>
                                    <i className="fas fa-plus roomKey"
                                      onClick={() => this.pushMusicToDB("https://www.youtube.com/watch?v=" + video.id.videoId)}>
                                    </i>
                                 </Button>
                               </td>
                            </tr>
                          )
                        }
                    </tbody>
                  </Table>
                  <br/>
                  <Button color="secondary" style={{float:'right'}} onClick={this.openYoutubeSearch}>Cancel</Button>
                </div>
              </ModalBody>
            </Modal>

            {/***************** MODAL FOR DELETE ROOM *****************/}
            <Modal className="deleteRoomBox" isOpen={this.state.deletingRoom} toggle={this.deleteRoom}>
              <ModalBody className="deleteModalBody">
                <h3 className="deleteTitle"> <i className="fas fa-door-closed"></i>  CONFIRM DELETION </h3>
                <br/>
               <span style={{color:'white'}}> Are you sure you permanently want to delete this room? </span>
                <br />
                <div className="addbox" id="addbox">
                  <br/>
                  <Button color="danger" id="addSubmit" onClick={this.destroyRoom}>Delete Room</Button>
                  <Button color="secondary" id="addCancel" onClick={this.deleteRoom}>Cancel</Button>
               </div>
              </ModalBody>
            </Modal>

          </div>

          <div className="roomWithKey">
            <p className="mainTitle">
              {this.state.roomTitle}
            </p>
          </div>
        <div>
          <Queue />
        </div>
      </div>
    );
  }
}

export default Main;
