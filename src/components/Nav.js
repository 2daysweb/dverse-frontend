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
  } = props

  // let logged_in = props.logged_in;
  let currUser = props.currUser;
  //updateCurrentUser = props.updateCurrentUser;

  let logout = () => {
    //debugger
    //clear localStorage of our jwt
    localStorage.clear()
    //set the user state back to null
    props.updateCurrentUser(null)
  };

  const renderNavbar = () => {
    //Check if Candidate, Employer, or Admin User-Type, conditionally render NavBar
    let userType = props.currUser.user_type;
    //debugger ;
    switch (userType) {
      case "employer":
        return (
          <Navbar>
            {/* <LinkContainer to="/signup">
                        <Nav.Link
                          activeStyle={{ fontWeight: "bold", color: "red" }}
                        >
                          Job Seeker Sign Up
                        </Nav.Link>
                      </LinkContainer> */}
            <Nav className="mr-auto">
              <LinkContainer to="/login">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
             
              <LinkContainer to="/candidates">
                <Nav.Link>Candidates</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/applications">
                <Nav.Link>Applications</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/jobs">
                <Nav.Link>Jobs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profile">
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
      case "candidate":
        return (
          <Navbar>
            <Nav className="mr-auto">
              <Link to="/login">Home</Link>
              <Link to="/jobs">Jobs</Link>
              <Link to="/applications">My Applications</Link>
              <Link to="/inbox">Inbox</Link>
              <Link to="/questions">Discussion Board</Link>
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
              <Link to="/login">Home</Link>
              <Nav.Link href="/jobs">Job Post Requests</Nav.Link>
              <Nav.Link href="/candidates">New Candidate Applications</Nav.Link>
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
        break;
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
              <a href="#login/:"/>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
};

export default withRouter(NavBar);

