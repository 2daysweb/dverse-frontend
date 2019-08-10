import React, { Component, Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
// import FormControl from 'react-bootstrap/FormControl'
import Button from "react-bootstrap/Button";

export default class LoginHeader extends Component {
  handleChangeInputUN = e => {
  console.log(e)
debugger 
  };

  render() {
    return (
      <div>
        <Fragment>
          <Navbar>
            <Navbar.Brand href="/">Dverse</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/login">Sign In</Nav.Link>
              <Nav.Link href="/createUser">Sign Up</Nav.Link>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <a href="#login/:" />
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
          <h1>Login</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={this.handleChangeInputUN.bind(this)}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text
                onChange={this.handleChangeInputUN.bind(this)}
                className="text-muted"
              >
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={this.handleChangeInputUN.bind(this)}
                type="password"
                placeholder="Password"
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
        ;
      </div>
    );
  }
}
