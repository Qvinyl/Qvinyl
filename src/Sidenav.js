import React, { Component } from 'react'
// import ReactPlayer from 'react-player'
import './Sidenav.css';
class Sidenav extends Component {
  constructor() {
    super();
 }
 addRoom() {
  alert("Add room was pressed");
}

  render () {
    return (
      <div className="sidenav">
        <div className="searchroom">
          <i className="fas fa-plus-circle plus" id="plus" onClick={()=> this.addRoom()}></i>
          <input className="inlink" type="text" name="name" />
        </div>
        <div className="sidescrollbox">
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
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
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
              <td className="td1"> Study Music room </td>
            </tr>
            <tr>
              <td className="td1"> Alternative room </td>
            </tr>
            <tr>
              <td className="td1"> Friends room </td>
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
          </table>
        </div>
      </div>
    );
  }
}

export default Sidenav;
