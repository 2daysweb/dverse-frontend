import React, { Component } from "react"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Nav from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Redirect, withRouter } from "react-router-dom"

class SignUpForm extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      currUser: {},
      userType: "",
      firstName: "",
      lastName: ""
    }
  }

  //On mount, set state of isEmployer based on location props passed from LandingPage
  componentDidMount() {
    if (this.props.location.state) {
      this.setState((prevState, prevProps) => ({
        isEmployer: prevProps.location.state.isEmployer
      }))
    }
  }

  handleChangeEmail = e => {

    let un = e.target.value
    this.setState({ email: un })
  }

  handleChangePassword = e => {
   
    let pw = e.target.value
    this.setState({ password: pw })
  }

  handleChangeFirstName = e => {
    let fn = e.target.value
    //debugger 
    this.setState({ firstName: fn })
   

  }

  handleChangeLastName = e => {
    let ln = e.target.value
    //debugger
    this.setState({ lastName: ln })
  
  }

  handleCandidateSignupSubmit = () => {
    // e.preventDefault()
    debugger 
    fetch("https://dverse-staffing-backend.herokuapp.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        user_type: "candidate"
      })
    })
      .then(res => res.json())
      .then(data =>{ console.log(data)
         this.setState({ currUser: data })
  })
  }

  handleEmployerSignupSubmit = () => {
    // e.preventDefault()

    fetch("https://dverse-staffing-backend.herokuapp.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        user_type: "employer"
      })
    })
      .then(res => res.json())
      .then(data => {console.log(data)
        this.setState({ currUser: data })
      })
      
  }

  //Conditionally render Employer or Candidate form based on state var isEmployer
  renderEmployerOrCandidateForm = () => {
    return !this.state.isEmployer ? (
      <div>
        <h1>Candidate Sign Up</h1>
        <form onSubmit={this.handleCandidateSignupSubmit}>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={this.handleChangeEmail}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.handleChangePassword}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control onChange={this.handleChangeFirstName}placeholder="First Name" />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control onChange={this.handleChangeLastName} placeholder="Last Name" />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="3 Taleex Street, Mogadishu, Somalia" />
            </Form.Group>

            
            <LinkContainer
              to={{
                pathname: "/login",
                state: { currUser: this.state.currUser }
              }}
            >
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleCandidateSignupSubmit}
              >
                Submit
              </Button>
            </LinkContainer>
          </Form>
        </form>
      </div>
    ) : (
      <div>
        <h1>Employer Sign Up</h1>
        <form onSubmit={this.handleEmployerSignupSubmit}>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={this.handleChangeEmail}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.handleChangePassword}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="First Name" />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Last Name" />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row />

            <LinkContainer
              to={{
                pathname: "/login",
                state: { currUser: this.state.currUser }
              }}
            >
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleEmployerSignupSubmit}
              >
                Submit
              </Button>
            </LinkContainer>
          </Form>
        </form>
      </div>
    )
  }

  render() {
    return this.renderEmployerOrCandidateForm()
  }
}

export default withRouter(SignUpForm)
