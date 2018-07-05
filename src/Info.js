import React, { Component } from 'react'
import "./Info.css"
class Info extends Component {
  render () {
    return (
        <div className="infobox">
          <div className="infobanner">
            <div className="infoTitle">Track Info </div>
            <div>
              <div className="vetobox">
                <div className="vetotext">Veto</div>
                <i className="fas fa-thumbs-down thumbsi"></i>
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
