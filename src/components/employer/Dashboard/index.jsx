import React, { Component } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {

componentDidMount(){
  this.props.history.push('employerdashboard')
}

  render() {
    return (
      <div>
        <Jumbotron fluid>
          <Container>
            <h1>Welcome to Your Employer Dashboard!</h1>
          </Container>
          <ul>
            <li>Learn how to add a job posting</li>
            <li>Learn how to delete a job posting</li>
            <li>Learn how to filter through our candidates database</li>
          </ul>
        </Jumbotron>
      </div>
    );
  }
}

export default withRouter(Dashboard);
