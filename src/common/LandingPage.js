import React, { Component } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { withRouter } from "react-router-dom"
import LandingNav from "./LandingNav"
import { Nav, Col, Row, Container, Jumbotron, Button } from "react-bootstrap"

class LandingPage extends Component {
  render() {
    return (
      <div>
        <LandingNav />
        <Row>
          <Col>
            <Jumbotron>
              <h1>I'm Looking for the Perfect Employee!</h1>
              <p>
                We have the best talent in the DMV. Let's connect you to our
                talent today.
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
              <h1>I'm Looking for the Perfect Job!</h1>
              <p>
                We have the best employers in the DMV, we help people like you
                find their dream jobs everyday.
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
        <Row>
          <Jumbotron>
            <p>
              {" "}
              Dverse is dedicated to providing employers and job seekers with
              the best possible matches, ever, ever, ever...! Please select the
              option that best describes your needs today!
            </p>
          </Jumbotron>
        </Row>
      </div>
    )
  }
}
export default withRouter(LandingPage)
