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

const Employer = props => {
  const { handleChange, handleSubmit } = props;
  return(
  <div>
    <h1>Employer Sign Up</h1>
      <Form >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" placeholder="First Name" />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" placeholder="Last Name" />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>
        <Form.Row />
        <LinkContainer
          to={{
            pathname: "/login"
          }}
        >
          <Button onSubmit={e => handleSubmit(e)} variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </LinkContainer>
      </Form>
  </div>
  )
};

export default Employer;
