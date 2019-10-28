import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Col,
  Nav,
  Navbar,
  Form,
  FormControl,
  Row
} from "react-bootstrap";

const Candidate = props => {
  const { logout } = props;
  return (
    <Navbar>
      <Nav className="mr-auto">
        <LinkContainer to="/candidatedashboard">
          <Nav.Link>Dashboard</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/candidatejobs">
          <Nav.Link>Jobs</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/apptracker">
          <Nav.Link>App Tracker</Nav.Link>
        </LinkContainer>
        <LinkContainer to="profile">
          <Nav.Link>Profile</Nav.Link>
        </LinkContainer>
      </Nav>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <a href="#login/:" />
        </Navbar.Text>
      </Navbar.Collapse>
      <Button onClick={logout} variant="primary">
        Logout
      </Button>
    </Navbar>
  );
};

export default Candidate;
