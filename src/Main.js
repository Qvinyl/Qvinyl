import React, { Component } from 'react'
import Queue from './Queue'
import './Main.css';
import Player from './Player'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container, 
  Row, 
  Col, 
  Button, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Input, 
  Table,
  Modal,
  ModalBody,
  ModalFooter 
} from 'reactstrap'

import firebase from 'firebase'
import './Queue.css';

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
      youtubeOpen: false
    };
    this.getRoomKey = this.getRoomKey.bind(this);
    this.getRoomName = this.getRoomName.bind(this);
    this.openYoutubeSearch = this.openYoutubeSearch.bind(this);

    this.videoSearch('lofi');
  }

  pushMusicToDB(link) {
    console.log("sending link: " + link);
    var userID = firebase.auth().currentUser.uid;
    var name = firebase.auth().currentUser.displayName;
    var userRoomKey = firebase.database().ref('users/' + userID + '/roomKeys');
    userRoomKey.once('value').then(function(snapshot){
      var roomKey = snapshot.val().currentRoom;
      if (roomKey == "") {
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
            var minutes = duration.slice(duration.lastIndexOf("T") + 1, duration.lastIndexOf("M"));
            var seconds = duration.slice(duration.lastIndexOf("M") + 1, duration.lastIndexOf("S"));
            duration = (minutes.length == 1 ? "0" + minutes : minutes)
                      + ":" + (seconds.length == 1 ? "0" + seconds : seconds);
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

  componentDidMount() {
    setTimeout(this.getRoomName.bind(this), 1000);
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      }); //Same as this.setState({ videos : videos })
    });
    console.log(this.state.videos);
  }

  openYoutubeSearch() {
    this.setState({
      youtubeOpen: !this.state.youtubeOpen
    });
    console.log(this.state.youtubeOpen);
  }

  render () {
    const {userList, videos} = this.state;

    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);


    return (
      <div className="main">

          <div className="mainButton">
            <Button style={{borderRadius:100, margin: "2px 2px 2px 2px"}}>
              <i className="fas fa-key roomKey" onClick={this.getRoomKey}></i>
            </Button>
            <Button style={{borderRadius:100, margin: "2px 2px 2px 2px"}}>
              <i className="fas fa-search searchSong" onClick={this.openYoutubeSearch}></i>
            </Button>
            <Modal isOpen={this.state.youtubeOpen} toggle={this.openYoutubeSearch}>
              <ModalBody>
                <div>
                  <SearchBar onSearchTermChange={videoSearch} />

                  <ul className="col-md-4 list-group">
                    {
                      videos.map((video) => 
                        <li>
                          <div>
                            <div>
                              <img src={video.snippet.thumbnails.default.url} />
                            </div>
                            <div >
                              <div>{video.snippet.title}
                                <Button style={{borderRadius:100, margin: "2px 2px 2px 2px"}}>
                                  <i className="fas fa-plus roomKey" 
                                    onClick={() => this.pushMusicToDB("https://www.youtube.com/watch?v=" + video.id.videoId)}>
                                  </i>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    }
                  </ul>

                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.openYoutubeSearch}>Cancel</Button>
              </ModalFooter>
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
