import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Row,
  Col,
  Button
} from "react-bootstrap";

/* <div class="row">
    <div class="col-md-6 col-md-offset-3"></div>
</div> */

class LandingNav extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col md={4}>
            {" "}
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="#home">
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
  }
}

export default withRouter(LandingNav);

// <Navbar.Toggle />
// <Navbar.Collapse className="justify-content-end">
//   <Navbar.Text>
//     <a href="#login/:" />
//   </Navbar.Text>
// </Navbar.Collapse>
