import React, { Component } from 'react'
import "./Queue.css"
import {Container, Row, Col, Button, Table} from 'reactstrap'
class Queue extends Component {
  render () {
    return (
      <Container className="scrollbox">
      <Table className="table">
        <tr>
          <th>Track Name</th>
          <th>Duration</th>
          <th>Artist</th>
          <th>Queued by</th>
        </tr>

      </Table>
      </Container>
    );
  }
}

export default Queue;
