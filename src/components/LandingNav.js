import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

/* <div class="row">
    <div class="col-md-6 col-md-offset-3"></div>
</div> */

export default class LandingNav extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/signup">SignUp</Nav.Link>
            <Nav.Link href="/employers">Employers</Nav.Link>
            <Nav.Link href="/jobseekers">Job Seekers</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#login/:" />
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
