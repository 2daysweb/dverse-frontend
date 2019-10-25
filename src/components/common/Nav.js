import React from "react";
import Login from "./Login";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Nav, Navbar } from "react-bootstrap";
import { logout } from "../../actions/index.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const NavBar = props => {
  const { user, history } = props;
  let logout = () => {
    history.push("/login");
    props.logout();
  };

  const renderNavbar = () => {
    let userType = user.user_type;
    switch (userType) {
      case "employer":
        return (
          <Navbar>
            <Nav className="mr-auto">
              <LinkContainer to="/employer-home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/candidates">
                <Nav.Link>Candidates</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/employ-jobs">
                <Nav.Link>Active Jobs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/pending-jobs">
                <Nav.Link>Pending Approval</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/draft-jobs">
                <Nav.Link>Post a Job</Nav.Link>
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
      case "candidate":
        return (
          <Navbar>
            <Nav className="mr-auto">
              <LinkContainer to="/candidate-home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/candidate-jobs">
                <Nav.Link>Jobs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/app-tracker">
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
      case "admin":
        return (
          <Navbar>
            <Nav className="mr-auto">
              <LinkContainer to="/admin-home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/approved-jobs">
                <Nav.Link>Approved Jobs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/pending-jobs">
                <Nav.Link>Pending Jobs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/active-candidates">
                <Nav.Link>Active Candidates</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/pending-candidates">
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

      default:
        return null;
    }
  };

  return (
    <div>
      {user ? (
        renderNavbar()
      ) : (
        <Navbar>
          <Nav className="mr-auto">
            <Login />
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#login/:" />
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(NavBar));
