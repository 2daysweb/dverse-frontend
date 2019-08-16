import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {Navbar, NavDropdown, Form, FormControl} from "react-bootstrap";
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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
      
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
