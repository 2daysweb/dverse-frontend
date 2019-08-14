import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, Accordion, Button, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CenterView from "./CenterView";

class LandingPage extends Component {
  render() {
    return (
      <CenterView>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                I'm an Employer!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {/* Link Container is subsistute for React Router Link, allows us to apply React Router to Bootstrap Components*/}
                {/*Pass in location "State" of isEmployer --- if True, render Employer Sign Up Form ---- if False, render Job Seeker Sign Up Form*/}

                <LinkContainer
                  to={{ pathname: "/login" }}
                >
                  <Nav.Link activeStyle={{ fontWeight: "bold", color: "red" }}>
                    Employer Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to={{ pathname: "/signup", state: { isEmployer: true } }}
                >
                  <Nav.Link>Employer Sign Up</Nav.Link>
                </LinkContainer>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                I'm a Job Seeker!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <LinkContainer to="/login">
                  <Nav.Link activeStyle={{ fontWeight: "bold", color: "red" }}>
                    Job Seeker Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup" userType={{ userType: "employee" }}>
                  <Nav.Link>Job Seeker Sign Up</Nav.Link>
                </LinkContainer>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </CenterView>
    );
  }
}

export default withRouter(LandingPage);
