import React, { Component } from 'react'
import './Qvinyl.css';
import Sidenav from './Sidenav'
import Main from './Main'
import Chat from './Chat'
import Player from './Player'
import {Container, Row, Col} from 'reactstrap';

class Qvinyl extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userID: false,
    };
  }

  render () {
    return (
    <div className="app">
      <Container fluid>
        <div className="appDiv">
          <Row noGutters>
            <Col md="12">
              <Player/>
            </Col>
          </Row>
          <div className="noScroll">
            <Row noGutters>
              <Col md="2">
                <Sidenav/>
              </Col>
              <Col md="8">
                <Row noGutters>
                  <Main/>
                </Row>
              </Col>
              <Col md="2">
                <Chat/>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
    );
  }
}

export default Qvinyl;
