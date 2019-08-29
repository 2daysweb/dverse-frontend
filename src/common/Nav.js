import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import LoginPage from "./LoginPage";

const NavBar = props => {
  let {
    location: { pathname }
  } = props;

  // let logged_in = props.logged_in
  let currUser = props.currUser;
  //updateCurrentUser = props.updateCurrentUser

  let logout = () => {
    
    //clear localStorage of our jwt
    localStorage.clear()
    //set the user state back to null
    props.updateCurrentUser(null)

    props.history.push('/login')
  }

  const renderNavbar = () => {
    //Check if Candidate, Employer, or Admin User-Type, conditionally render NavBar
    let userType = props.currUser.user_type;
    //debugger
    switch (userType) {
      case "employer":
        return (
          <Navbar>
            <Nav className="mr-auto">
              <LinkContainer to="/employhome">
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
              <LinkContainer to="/employprofile">
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
        )
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
            {/* <LinkContainer to="/myjobs">
              <Nav.Link>My Jobs</Nav.Link>
            </LinkContainer> */}
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

  //If User is not logged in (i.e.currUser is NULL) render NavBar component with Login / SignUp Headers only

  return (
    <div>
      {currUser ? (
        renderNavbar()
      ) : (
        <Navbar>
          <Nav className="mr-auto">
            <LoginPage />
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

export default withRouter(NavBar)
