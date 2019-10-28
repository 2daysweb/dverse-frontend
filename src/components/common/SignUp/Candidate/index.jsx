import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Col,
  Nav,
  Navbar,
  Form,
  FormControl,
  Row
} from "react-bootstrap";

const Candidate = props => {
  const { handleChange, handleSubmit } = props;
  return (
    <div>
      <h1>Candidate Sign Up</h1>

      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={e => handleChange(e)}
              name="email"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={e => handleChange(e)}
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="firstName"
              placeholder="First Name"
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="lastName"
              placeholder="Last Name"
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="555 DEFAULT STREET" />
        </Form.Group>

        <LinkContainer
          to={{
            pathname: "/login"
          }}
        >
          <Button
            onSubmit={e => handleSubmit(e)}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </LinkContainer>
      </Form>
    </div>
  );
};

export default Candidate;
