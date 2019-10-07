import React from "react";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Login from "./Login";
import {logout} from '../actions/index.js'
import { connect } from "react-redux";

const NavBar = props => {
  console.log(props, "PROPS IN NAVBAR");
  const { user, history } = props;

  let logout = () => {
    history.push("/login");
    props.logout()
  };

  const renderNavbar = () => {
    let userType = user.user_type;
    switch (userType) {
      case "employer":
        return (
          <Navbar>
            <Nav className="mr-auto">
              <LinkContainer to="/employerhome">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/candidates">
                <Nav.Link>Candidates</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/applications">
                <Nav.Link>Applications</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/employjobs">
                <Nav.Link>My Jobs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/mypendingjobs">
                <Nav.Link>Pending Jobs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/mydraftjobs">
                <Nav.Link>Create Job Post</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/jobs">
                <Nav.Link>Jobs</Nav.Link>
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
              <LinkContainer to="/candidatehome">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/candidatejobs">
                <Nav.Link>Jobs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/apptracker">
                <Nav.Link>App Tracker</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/myprofile">
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
              <LinkContainer to="/adminhome">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/approvedjobs">
                <Nav.Link>Approved Jobs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/pendingjobs">
                <Nav.Link>Pending Jobs</Nav.Link>
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

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
