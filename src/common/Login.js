import React, { Component, Fragment } from "react";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions/index.js";

class Login extends Component {
  state = {
    email: "",
    password: "",
    user: null,
    submitted: false
  };

  handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    return this.props.setCurrentUser(email, password);
  };

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
                onChange={e => this.handleChange(e)}
                type="email"
                name="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={e => this.handleChange(e)}
                type="password"
                name="password"
                placeholder="Password"
              />
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

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: (email, password) => {
      dispatch(setCurrentUser(email, password));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Login));
