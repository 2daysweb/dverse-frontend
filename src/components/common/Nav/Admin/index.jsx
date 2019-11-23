import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Nav,
  Navbar
} from "react-bootstrap";

const Admin = props => {
  const { logout } = props;
  return (
    <Navbar>
      <Nav className="mr-auto">
        <LinkContainer to="/admindashboard">
          <Nav.Link>Dashboard</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/approvedjobs">
          <Nav.Link>Approved Jobs</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/submittedjobs">
          <Nav.Link>Submitted Jobs</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/activecandidates">
          <Nav.Link>Active Candidates</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/pendingcandidates">
          <Nav.Link>Pending Candidates</Nav.Link>
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

export default Admin;
