import React, { useState } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import styles from "./styles.css";
import { setUser } from "../../../actions";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    return setUser(email, password);
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={e => handleSubmit(e)}>
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    setUser: (email, password) => {
      dispatch(setUser(email, password));
    }
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
