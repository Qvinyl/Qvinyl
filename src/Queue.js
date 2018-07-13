import React, { Component } from 'react'
import "./Queue.css"
class Queue extends Component {
  render () {
    return (
      <div className="scrollbox">
      <table className="table">
        <tr>
          <th>Track Name</th>
          <th>Duration</th>
          <th>Artist</th>
          <th>Queued by</th>
        </tr>

      </table>
      </div>
    );
  }
}

export default Queue;
