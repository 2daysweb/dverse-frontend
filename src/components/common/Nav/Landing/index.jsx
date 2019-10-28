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

const Landing = () => {
  return (
    <div>
      <Row>
        <Col md={4}>
          {" "}
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
              Dverse, Talent {"&"} Opportunites
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Navbar>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          {
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          }
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
