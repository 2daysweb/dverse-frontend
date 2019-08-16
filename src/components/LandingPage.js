import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import LandingNav from "./LandingNav";
import { Nav, Col, Row, Container, Jumbotron, Button } from "react-bootstrap";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <LandingNav />
        <Row>
          <Col>
            <Jumbotron>
              <h1>Hello, world!</h1>
              <p>
                This is a simple hero unit, a simple jumbotron-style component
                for calling extra attention to featured content or information.
              </p>
              <p>
                <Button variant="light">
                  <Row>
                    <Col>
                      <LinkContainer to="/signup">
                        <Nav.Link
                          activeStyle={{ fontWeight: "bold", color: "red" }}
                        >
                          Job Seeker Sign Up
                        </Nav.Link>
                      </LinkContainer>
                    </Col>
                    <Col>
                      <LinkContainer to="/login">
                        <Nav.Link
                          activeStyle={{ fontWeight: "bold", color: "red" }}
                        >
                          Job Seeker Login
                        </Nav.Link>
                      </LinkContainer>
                    </Col>
                  </Row>
                </Button>
              </p>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron>
              {" "}
              <h1>Hello, world!</h1>
              <p>
                This is a simple hero unit, a simple jumbotron-style component
                for calling extra attention to featured content or information.
              </p>
              <p>
                <Button variant="light">
                  <Row>
                    <Col>
                      <LinkContainer
                        to={{
                          pathname: "/signup",
                          state: { isEmployer: true }
                        }}
                      >
                        <Nav.Link
                          activeStyle={{ fontWeight: "bold", color: "red" }}
                        >
                          Employer Sign Up
                        </Nav.Link>
                      </LinkContainer>
                    </Col>
                    <Col>
                      <LinkContainer to="/login">
                        <Nav.Link
                          activeStyle={{ fontWeight: "bold", color: "red" }}
                        >
                          Employer Login
                        </Nav.Link>
                      </LinkContainer>
                    </Col>
                  </Row>
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(LandingPage);
