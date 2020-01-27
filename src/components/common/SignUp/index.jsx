import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Candidate from "./Candidate";
import Employer from "./Employer";

const BASE_URL = "http://localhost:3000/";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };

  componentDidMount() {
    if (this.props.location.state) {
      this.setState((prevState, prevProps) => ({
        isEmployer: prevProps.location.state.isEmployer
      }));
    }
  }

  handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmitCandidate = () => {
    fetch(BASE_URL + "api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        user_type: "candidate"
      })
    }).then(res => res.json());
  };

  handleSubmitEmployer = () => {
    fetch(BASE_URL + "api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        user_type: "employer"
      })
    }).then(res => res.json());
  };

  render() {
    return this.state.isEmployer ? (
      <Employer
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmitEmployer}
      />
    ) : (
      <Candidate
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmitCandidate}
      />
    );
  }
}

export default withRouter(SignUp);
