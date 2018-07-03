import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class App extends Component {
  render () {
    return (
      <ReactPlayer url='https://www.youtube.com/watch?v=feA64wXhbjo' playing />
    );
  }
}

export default App;
