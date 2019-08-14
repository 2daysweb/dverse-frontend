import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import CenterView from "./CenterView";
import {withRouter, Link} from "react-router-dom";

class LandingPage extends Component {

  render() {
    return (
      <CenterView>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                I'm an Employer?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body><Link to="/login"></Link><Link to="/login">Login</Link>
              <Link to="/signup">SignUp</Link></Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                I'm a Job Seeker!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>BLANK</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </CenterView>
    );
  }
}

export default withRouter(LandingPage)