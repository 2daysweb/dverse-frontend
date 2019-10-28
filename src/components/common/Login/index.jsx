import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { setUser } from "../../../actions";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    const { setUser } = props;
    return setUser(email, password);
  };

  return (
    <div>
      <Fragment>
        <h1>Login</h1>
        <Form onSubmit={e => handleLoginSubmit(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={e => handleChange(e)}
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
              onChange={e => handleChange(e)}
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
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (email, password) => {
      dispatch(setUser(email, password));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Login));
