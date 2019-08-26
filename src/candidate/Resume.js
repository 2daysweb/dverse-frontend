import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";

export default class Resume extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Group as={Row} controlId="formFirstName">
            <Form.Label column sm="2">
              First Name
            </Form.Label>
            <Col sm="10">
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formLastName">
            <Form.Label column sm="2">
              Last Name
            </Form.Label>
            <Col sm="10">
              <Form.Control />
            </Col>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>
          <Col>
            {["checkbox"].map(type => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  type={type}
                  id={`default-${type}`}
                  label={"Authorized to Work for Any Employer in US"}
                />
                <br />
                <br />

                <Form.Check
                  type={type}
                  id={`default-${type}`}
                  label={"Sponsorship Required"}
                />
                <br />
                <br />
                <Form.Check
                  type={type}
                  id={`default-${type}`}
                  label={"Not Specified"}
                />
              </div>
            ))}
          </Col>
        </Form>
      </div>
    );
  }
}
