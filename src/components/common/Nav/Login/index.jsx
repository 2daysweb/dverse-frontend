import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { 
  Nav,
  Navbar
} from "react-bootstrap";

const Login = () => {
  return (
    <Navbar>
      <Navbar.Brand href="/">Dverse</Navbar.Brand>
      <Nav className="mr-auto">
        <LinkContainer to={{ pathname: "/signup" }}>
          <Nav.Link>Job Seeker Sign Up</Nav.Link>
        </LinkContainer>
        <LinkContainer
          to={{ pathname: "/signup", state: { isEmployer: true } }}
        >
          <Nav.Link>Employer Sign Up</Nav.Link>
        </LinkContainer>
      </Nav>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Login;
