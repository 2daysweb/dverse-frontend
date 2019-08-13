import React, { Component, Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  handleChangeEmail = e => {
    console.log(e);
    console.log(e.target.value);
    let un = e.target.value;
    this.setState({ email: un });

    // debugger
  };

  handleChangePassword = e => {
    let pw = e.target.value;
    this.setState({ password: pw });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
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

  render() {
    return (
      <div>
        <Fragment>
          <Navbar>
            <Navbar.Brand href="/">Dverse</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/login">Sign In</Nav.Link>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text />
            </Navbar.Collapse>
          </Navbar>
          <h1>Login</h1>
          <Form onSubmit={this.handleLoginSubmit}>
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
            <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Fragment>
      </div>
    );
  }
}
