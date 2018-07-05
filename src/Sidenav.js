import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './Sidenav.css';
class Sidenav extends Component {
  render () {
    return (
      <div className="sidenav">
        <table className="table1">
          <tr>
            <td className="td1"> Audio room </td>
          </tr>
          <tr>
            <td className="td1"> Study Music room </td>
          </tr>
          <tr>
            <td className="td1"> Alternative room </td>
          </tr>
          <tr>
            <td className="td1"> Friends room </td>
          </tr>
          <tr>
            <td className="td1"> Audio room </td>
          </tr>
          <tr>
            <td className="td1"> Audio room </td>
          </tr>
        </table>
      </div>
    );
  }
}

function roomClick() {

}

export default Sidenav;
