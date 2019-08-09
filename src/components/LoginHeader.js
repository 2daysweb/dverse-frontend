import React, {Fragment} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const LoginHeader = () => {
  return (
    <Fragment>
   <Navbar>
  <Navbar.Brand href="/">Dverse</Navbar.Brand>
  <Nav className="mr-auto">
      <Nav.Link href="/Login">Sign In</Nav.Link>
    </Nav>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      <a href="#login"></a>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
<Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicChecbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Fragment>
  );
}

export default LoginHeader;