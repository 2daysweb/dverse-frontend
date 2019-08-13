import React, {Fragment} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'


const Header = (props) => {

// 
  

  //On arrival, user is sent to the a login page (LoginHeader component) to begin with
  //User enters email and pw, if authenticated, render JobPostingContainer with User prop
  

  //If they click signup, the user is rendered the (SignupHeader component)
  //If they fill in valid email, pw ---> redirect-to JobPostingContainer empty 
    
  //If user is signed in, render the below Navbar 





  return (
    <Fragment>
            <Navbar>
      <Navbar.Brand href="/">Dverse</Navbar.Brand>
      <Nav className="mr-auto">
          <Nav.Link href="/candidates">Search Candidates</Nav.Link>
          <Nav.Link href="/jobs">My Job Postings</Nav.Link>
          <Nav.Link href="/job">Create Job Posting</Nav.Link>
          <Nav.Link href="/applications">Applications</Nav.Link>
        </Nav>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as:  <a href="#login"></a>
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




// <Route
// exact
// path="/createUser"
// render={props => (
//   <SignUpHeader
//     {...props}
//     handleChangeInputNewUN={this.handleChangeInputNewUN}
//     handleChangeInputNewPW={this.handleChangeInputNewPW}
//     currInputLoginUN={this.state.currInputLoginUN}
//     currInputLoginPW={this.state.currInputLoginPW}
//     handleSubmitSignup={this.handleSubmitSignup}
//   />
// )}
// />

// let renderLoginOrSignupOrContainer = () => {


  //   if(props.currUser){
  //     return (
  
  //     )
  //   }
  
  //   else if (props.) {
  
  //   }
  