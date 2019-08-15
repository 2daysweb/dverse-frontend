import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  //On mount, set state of isEmployer based on location props passed from LandingPage
  componentDidMount() {
    this.setState((prevState, prevProps) => ({
      isEmployer: prevProps.location.state.isEmployer
    }));
  }

  handleChangeEmail = e => {
    console.log(e.target.value);
    let un = e.target.value;
    this.setState({ email: un });
  };

  handleChangePassword = e => {
    let pw = e.target.value;
    this.setState({ password: pw });
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
        if (data.authenticated) {
          //update state
          this.props.updateCurrentUser(data.user);
          //store the token in localStorage
          localStorage.setItem("jwt", data.token);
        } else {
          alert("incorrect username or password");
        }
      });
  };

  //Conditionally render Employer or Candidate form based on state var isEmployer
  renderEmployerOrCandidateForm = () => {
    return !this.state.isEmployer ? (
      <div>
        <h1>Candidate Sign Up</h1>
        <Form onSubmit={() => this.props.handleSubmitSignup}>
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

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    ) : (
      <div>
        <h1>Employer Sign Up</h1>
        <Form onSubmit={() => this.props.handleSubmitSignup}>
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

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  };

  render() {
    return this.renderEmployerOrCandidateForm();
  }
}
