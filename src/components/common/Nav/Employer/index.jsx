import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Nav,
  Navbar,
} from "react-bootstrap";

const Employer = (props) => {
  const {logout} = props
  return (
    <Navbar>
      <Nav className="mr-auto">
        <LinkContainer to="/employerdashboard">
          <Nav.Link>Dashboard</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/candidates">
          <Nav.Link>Candidates</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/draftjobs">
          <Nav.Link>Post a Job</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/alljobs">
          <Nav.Link>All Jobs</Nav.Link>
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

export default Employer;
