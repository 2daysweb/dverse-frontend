import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LandingNav from "./LandingNav";
import {
  Card,
  Accordion,
  Button,
  Nav,
  Container,
  Jumbotron
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CenterView from "./CenterView";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <LandingNav />
        <Jumbotron fluid>
          <Container>
            <h1>Fluid jumbotron</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Container>
        </Jumbotron>

        <Jumbotron fluid>
          <Container>
            <h1>Fluid jumbotron</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default withRouter(LandingPage);
