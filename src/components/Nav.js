import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import  Nav  from 'react-bootstrap/Nav'
import LoginForm from './LoginForm'

const NavBar = (props) => {
  let { location: { pathname } } = props
  let logged_in = props.logged_in;
  let currUser = props.currUser
  let updateCurrentUser = props.updateCurrentUser
  let logout = () => {
    //clear localStorage of our jwt
    localStorage.removeItem("jwt")
    //set the user state back to null
    props.updateCurrentUser(null)
  }

//If User is not logged in (i.e.currUser is NULL) render NavBar component with Login / SignUp Headers only 

  return (

      <div>
            

          { currUser ? (
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
          </Navbar>
          ): (
            <Navbar>
            <Navbar.Brand href="/">Dverse</Navbar.Brand>
            <Nav className="mr-auto">
              <LoginForm updateCurrentUser={updateCurrentUser}/>
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
    
  )
  

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
}
export default withRouter(NavBar)