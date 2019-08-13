import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button'
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import LoginForm from "./LoginForm";


const NavBar = props => {
  let {
    location: { pathname }
  } = props;
  let logged_in = props.logged_in;
  let currUser = props.currUser;
  let updateCurrentUser = props.updateCurrentUser;
  let logout = () => {
    //clear localStorage of our jwt
    localStorage.removeItem("jwt");
    //set the user state back to null
    props.updateCurrentUser(null);
  };

  const renderNavbar = () => {
    //Check if Candidate, Employer, or Admin User-Type
    let userType = props.currUser.user_type;
    switch (userType) {
      case "employer":
        return (
          <Navbar>
            <Navbar.Brand href="/">Dverse</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/candidates">Candidates</Nav.Link>
              <Nav.Link href="/applications">Applications</Nav.Link>
              <Nav.Link href="/candidates">Inbox</Nav.Link>
              <Nav.Link href="/candidates">Help</Nav.Link>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <a href="#login/:" />
              </Navbar.Text>
            </Navbar.Collapse>
            <Button variant="link">Link</Button>
          </Navbar>
        );
        break;
      case "candidate":
        return  (<Navbar>
        <Navbar.Brand href="/">Dverse</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/jobs">Jobs</Nav.Link>
          <Nav.Link href="/candidates">Inbox</Nav.Link>
          <Nav.Link href="/candidates">Help</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="#login/:" />
          </Navbar.Text>
        </Navbar.Collapse>
        <Button variant="link">Link</Button>
      </Navbar>)
        break;
      case "admin":
        return  (<Navbar>
            <Navbar.Brand href="/">Dverse</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/newjobpost">Job Post Requests</Nav.Link>
              <Nav.Link href="/candidates">New Candidate Applications</Nav.Link>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <a href="#login/:" />
              </Navbar.Text>
            </Navbar.Collapse>
            <Button variant="link">Link</Button>
          </Navbar>)
        break;
      default:
        return false;
    }
  };

  //If User is not logged in (i.e.currUser is NULL) render NavBar component with Login / SignUp Headers only

  return (
    <div>
      {currUser ? (
        renderNavbar()
      ) : (
        <Navbar>
          <Navbar.Brand href="/">Dverse</Navbar.Brand>
          <Nav className="mr-auto">
            <LoginForm updateCurrentUser={updateCurrentUser} />
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

  //   <Navbar>
  //   <Navbar.Brand href="/">Dverse</Navbar.Brand>
  //   <Nav className="mr-auto">
  //     <Nav.Link href="/login">Sign In</Nav.Link>
  //     <Nav.Link href="/createUser">Sign Up</Nav.Link>
  //     <Nav.Link href="/candidates">Candidates</Nav.Link>
  //     <Nav.Link href="/applications">Applications</Nav.Link>
  //   </Nav>
  //   <Navbar.Toggle />
  //   <Navbar.Collapse className="justify-content-end">
  //     <Navbar.Text>
  //       <a href="#login/:" />
  //     </Navbar.Text>
  //   </Navbar.Collapse>
  // </Navbar>
  //     <Menu pointing secondary>
  //       {logged_in ? (
  //         <Fragment>
  //           <Menu.Item
  //             as={NavLink}
  //             to="/profile"
  //             name="Profile"
  //             active={pathname === "/profile"}
  //           />
  //           <Menu.Menu position="right">
  //             <Menu.Item to="/logout" name="Logout" onClick={logout} />
  //           </Menu.Menu>
  //         </Fragment>
  //       ) : (
  //         <Menu.Item
  //           as={NavLink}
  //           to="/login"
  //           name="Login"
  //           active={pathname === "/login"}
  //         />
  //       )}
  //     </Menu>
  //   );
  // };
};
export default withRouter(NavBar);
