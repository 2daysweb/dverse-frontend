import React, { Component, Fragment } from "react"
import { Nav, Navbar, Form, Button } from "react-bootstrap"
import { Link, withRouter } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

class LoginPage extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    }
  }

  handleChangeEmail = e => {
    console.log(e)
    console.log(e.target.value)
    let un = e.target.value
    this.setState({ email: un })


  }

  handleChangePassword = e => {
    let pw = e.target.value
    this.setState({ password: pw })

  }

  handleLoginSubmit = e => {
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        //---AUTHENTICATION-----If User Authenticates, Update current user, issue JWT Token
        if (data.authenticated) {
          localStorage.setItem("user", data.user)

          //store the token in localStorage
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("currUser", data.user)
          this.props.updateCurrentUser(data.user)
        } else {
          alert("incorrect username or password")
        }
      })
  }

  render() {
    return (
      <div>
        <Fragment>
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
          <h1>Login</h1>
          <Form onSubmit={e => this.handleLoginSubmit(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={this.handleChangeEmail}
                type="email"
                placeholder="Enter email"
                value={this.state.email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={this.handleChangePassword}
                type="password"
                placeholder="Password"
                value={this.state.password}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Fragment>
      </div>
    )
  }
}

export default withRouter(LoginPage)

//Priorities:

//1.) Employers portal works as expected
//2.) Start with login error --- dubug
//3.) Have candidates page working as expected (can't add candidate) --- instructions appear properly --- the correct information (Can add Job) appears for Jobs page as well
//4.) Repeat process for Candidates --- Create "Apply" button which notifies Admin of application
//5.) Add filters for employers ---- and candidates ----


// import React, { Component, Fragment } from "react"
// import { Nav, Navbar, Form, Button } from "react-bootstrap"
// import { withRouter } from "react-router-dom"
// import { LinkContainer } from "react-router-bootstrap"

// class LoginPage extends Component {
//   constructor() {
//     super()
//     this.state = {
//       email: "",
//       password: ""
//     }
//   }

//   handleChangeEmail = e => {
//     console.log(e)
//     console.log(e.target.value)
//     let un = e.target.value
//     this.setState({ email: un })
//   }

//   handleChangePassword = e => {
//     let pw = e.target.value
//     this.setState({ password: pw })
//   }

//   handleLoginSubmit = e => {
//     e.preventDefault()
//     fetch("http://localhost:3000/api/v1/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: this.state.email,
//         password: this.state.password
//       })
//     })
//       .then(res => res.json())
//       .then(data => {
//         //---AUTHENTICATION-----If User Authenticates, Update current user, issue JWT Token
//         if (data.authenticated) {
//           localStorage.setItem("user", data.user)

//           //store the token in localStorage
//           localStorage.setItem("jwt", data.token)
//           this.props.updateCurrentUser(data.user)
//         } else {
//           alert("incorrect username or password")
//         }
//       })
//   }

//   render() {
//     return (
//       <div>
//         <Fragment>
//           <Navbar>
//             <Navbar.Brand href="/">Dverse</Navbar.Brand>
//             <Nav className="mr-auto">
//               <LinkContainer to={{ pathname: "/signup" }}>
//                 <Nav.Link>Job Seeker Sign Up</Nav.Link>
//               </LinkContainer>
//               <LinkContainer
//                 to={{ pathname: "/signup", state: { isEmployer: true } }}
//               >
//                 <Nav.Link>Employer Sign Up</Nav.Link>
//               </LinkContainer>
//             </Nav>
//             <Navbar.Toggle />
//             <Navbar.Collapse className="justify-content-end">
//               <Navbar.Text />
//             </Navbar.Collapse>
//           </Navbar>
//           <h1>Login</h1>
//           <Form onSubmit={e => this.handleLoginSubmit(e)}>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 onChange={this.handleChangeEmail}
//                 type="email"
//                 placeholder="Enter email"
//                 value={this.state.email}
//               />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 onChange={this.handleChangePassword}
//                 type="password"
//                 placeholder="Password"
//                 value={this.state.password}
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Fragment>
//       </div>
//     )
//   }
// }

// export default withRouter(LoginPage)

// import React, { Component, Fragment } from "react"
// import { Nav, Navbar, Form, Button } from "react-bootstrap"
// import { Link, withRouter } from "react-router-dom"
// import { LinkContainer } from "react-router-bootstrap"

// class LoginPage extends Component {
//   constructor() {
//     super()
//     this.state = {
//       email: "",
//       password: ""
//     }
//   }

//   handleChangeEmail = e => {
//     console.log(e)
//     console.log(e.target.value)
//     let un = e.target.value
//     this.setState({ email: un })

//   }

//   handleChangePassword = e => {
//     let pw = e.target.value
//     this.setState({ password: pw })

//   }

//   handleLoginSubmit = e => {
//     e.preventDefault()
//     fetch("http://localhost:3000/api/v1/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: this.state.email,
//         password: this.state.password
//       })
//     })
//       .then(res => res.json())
//       .then(data => {
//         //---AUTHENTICATION-----If User Authenticates, Update current user, issue JWT Token
//         if (data.authenticated) {
//           localStorage.setItem("user", data.user)

//           //store the token in localStorage
//           localStorage.setItem("jwt", data.token)
//           this.props.updateCurrentUser(data.user)
//         } else {
//           alert("incorrect username or password")
//         }
//       })
//   }

//   render() {
//     return (
//       <div>
//         <Fragment>
//           <Navbar>
//             <Navbar.Brand href="/">Dverse</Navbar.Brand>
//             <Nav className="mr-auto">
//               <LinkContainer to={{ pathname: "/signup" }}>
//                 <Nav.Link>Job Seeker Sign Up</Nav.Link>
//               </LinkContainer>
//               <LinkContainer
//                 to={{ pathname: "/signup", state: { isEmployer: true } }}
//               >
//                 <Nav.Link>Employer Sign Up</Nav.Link>
//               </LinkContainer>
//             </Nav>
//             <Navbar.Toggle />
//             <Navbar.Collapse className="justify-content-end">
//               <Navbar.Text />
//             </Navbar.Collapse>
//           </Navbar>
//           <h1>Login</h1>
//           <Form onSubmit={e => this.handleLoginSubmit(e)}>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 onChange={this.handleChangeEmail}
//                 type="email"
//                 placeholder="Enter email"
//                 value={this.state.email}
//               />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 onChange={this.handleChangePassword}
//                 type="password"
//                 placeholder="Password"
//                 value={this.state.password}
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Fragment>
//       </div>
//     )
//   }
// }

// export default withRouter(LoginPage)


//Priorities:

//1.) Employers portal works as expected
//2.) Start with login error --- dubug
//3.) Have candidates page working as expected (can't add candidate) --- instructions appear properly --- the correct information (Can add Job) appears for Jobs page as well
//4.) Repeat process for Candidates --- Create "Apply" button which notifies Admin of application
//5.) Add filters for employers ---- and candidates ----
