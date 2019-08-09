import React, {Fragment} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

const Header = () => {
  return (
    <Fragment>
   <Navbar>
  <Navbar.Brand href="#home">Dverse</Navbar.Brand>
  <Nav className="mr-auto">
      <Nav.Link>  <Link to={"/"}></Link>Search Candidates</Nav.Link>
      <Nav.Link href="#link">My Job Postings</Nav.Link>
      <Nav.Link href="#home">Create Job Posting</Nav.Link>
      <Nav.Link href="#link">Applications</Nav.Link>
    </Nav>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      Signed in as: <a href="#login">Mark Otto</a>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
</Fragment>
  );
}

export default Header;
/* <div className="nav-bar">
<ul>
  <li className="nav-item"><button>Home</button></li>
  <li className="nav-item"><button>App</button></li>
  <li className="nav-item"><button>Login</button></li>
  <li className="nav-item"><button>Sign Up</button></li>
</ul>
</div> */