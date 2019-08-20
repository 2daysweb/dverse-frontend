import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect, withRouter } from "react-router-dom";

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      currUser: {}
    }
  }

  //On mount, set state of isEmployer based on location props passed from LandingPage
  componentDidMount() {
    if (this.props.location.state) {
      this.setState((prevState, prevProps) => ({
        isEmployer: prevProps.location.state.isEmployer
      }));
    }
  }

  handleChangeEmail = e => {
    console.log(e.target.value)
    let un = e.target.value;
    this.setState({ email: un })
  };

  handleChangePassword = e => {
    let pw = e.target.value;
    this.setState({ password: pw })
  };

  handleSignupSubmit = e => {
    e.preventDefault();

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ currUser: data })
      })
      .then(<Redirect to={{
        pathname: '/profile',
        state: {  currUser: this.state.currUser }
    }}
/>)
  };

  //Conditionally render Employer or Candidate form based on state var isEmployer
  renderEmployerOrCandidateForm = () => {
    return !this.state.isEmployer ? (
      <div>
        <h1>Candidate Sign Up</h1>
        <form onSubmit={e => this.handleSignupSubmit(e)}>
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

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </form>
      </div>
    ) : (
      <div>
        <h1>Employer Sign Up</h1>
        <form onSubmit={e => this.handleSignupSubmit(e)}>
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

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>

            <LinkContainer
              to={{
                pathname: "/profile",
                state: { currUser: this.state.currUser}
              }}
            >
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </LinkContainer>

        
          </Form>
        </form>
      </div>
    );
  };

  render() {
    return this.renderEmployerOrCandidateForm();
  }
}

export default withRouter(SignUpForm);
