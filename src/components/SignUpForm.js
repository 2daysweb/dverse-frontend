import React, { Component } from "react";
import { Col, InputGroup, Form, FormControl, Button } from "react-bootstrap";
import ActiveStorageProvider from 'react-activestorage-provider'
import { NGROK, URL } from "./Constants";
import {Fragment} from 'react'

export default class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      avatar: "",
      bio: "",
      education: "",
      educationType: "",
      canInvite: "",
      resume: "",
      user_type: "",
      fileName: ""
    };
  }

  //On mount, set state of isEmployer based on location props passed from LandingPage
  componentDidMount() {
    if (this.props.location.state) {
      this.setState((prevState, prevProps) => ({
        isEmployer: prevProps.location.state.isEmployer
      }));
    }
  }

  handleSubmitAvatar = (e) => {
    e.persist()
    debugger
    console.log(e)
  }

  successHandler = (e) => {
    e.persist()
    console.log(e)
  }
  submitHandler = (e) => {
    e.persist()
    console.log(e)
  }

  response = (e) => {
    this.setState({
      user: {
        ...this.state.user,
      avatar: e.file.name
    }
  })
    e.state = null
  }

  handleUploadAvatar = (e) => {
  
  }

  handleUploadResume = (e) => {
  
  }

  handleChangeEmail = e => {
    console.log(e.target.value);
    let un = e.target.value;
    this.setState({ email: un });
  };

  handleChangePassword = e => {
    let pw = e.target.value;
    this.setState({ password: pw });
  };

  handleSignupSubmit = e => {
    e.preventDefault();
    debugger 

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        avatar: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjUzYXkuI3kAhVxUd8KHcHIDRcQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Favatar_147144&psig=AOvVaw1nzXTgnrGZIkPPSeZvePNn&ust=1566252872868144"
      })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  handleSubmitResume = (e) => {
    e.persist()
    debugger 
    this.setState({resume: e.target.value})
  }

  //Conditionally render Employer or Candidate form based on state var isEmployer
  renderEmployerOrCandidateForm = () => {
    return !this.state.isEmployer ? (
      <div>
        <h1>Candidate Sign Up</h1>
        <form onSubmit={e => this.handleSignupSubmit(e)}>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={this.handleChangeEmail}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.handleChangePassword}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Form.Row>


            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </form>
     
      <ActiveStorageProvider
    endpoint={{
    path: `api/vi/${ this.props.currUser}`,
    model:  this.props.currUser,
    host: NGROK,
    attribute: this.state.fileName,
    method: 'POST'
    }}
onSuccess={(e) => this.successHandler(e)}
    onSubmit={(e) => this.submitHandler(e)}
    render={({ handleUpload, uploads, ready }) => (
      <div>
        <input
          type="file"
          disabled={!ready}
          onChange={e => {
            return handleUpload(e.currentTarget.files)}}
        />
{uploads.map(upload => {
        switch (upload.state) {
          case 'waiting':
            return <p key={upload.id}>Waiting to upload {upload.file.name}</p>
          case 'uploading':
            return (
              <p key={upload.id}>
                Uploading {upload.file.name}: {upload.progress}%
              </p>
            )
          case 'error':
            return (
              <Fragment>
              <p key={upload.id}>
                Error uploading {upload.file.name}: {upload.error}
              </p>
              </Fragment>
            )
          case 'finished':
            return (
              <Fragment>
          {this.response(upload)}
              <p key={upload.id}>Finished uploading {upload.file.name}</p>
              </Fragment>)
default:
          return null;
        }
      })}
    </div>
  )}
  />
)}
      
      </div>
    ) : (
      <div>
        <h1>Employer Sign Up</h1>
        <form onSubmit={e => this.handleSignupSubmit(e)}>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={this.handleChangeEmail}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.handleChangePassword}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Home Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Row>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select City You're Applying From</Form.Label>
                <Form.Control as="select">
                  <option>Annandale, VA - Headquarters</option>
                  <option>McLean, VA - Tysons Branch </option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            
            {/* <DirectUploadProvider multiple onSuccess={handleAttachment} render={...props} /> */}
            <Form.Row>
              <Form.Group controlId="education">
                <Form.Label>Please Select Your Education Level</Form.Label>
                <Form.Control as="select">
                  <option>4 Year Degree --- Bachelors </option>
                  <option>2 Year Degree --- Associates</option>
                  <option>Graduate Degree --- Masters </option>
                  <option>Graduate Degree --- PhD </option>
                  <option>Highschool Diploma</option>
                  <option>None</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="canInvite">
                <Form.Label>Select City You're Applying From</Form.Label>
                <Form.Control as="select">
                  <option>Annandale, VA - Headquarters</option>
                  <option>McLean, VA - Tysons Branch </option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>resume</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>
            <ActiveStorageProvider
      endpoint={{
        path: `api/vi/`,
        model: 'User',
        host: NGROK,
        method: "POST"
      }}
      onSubmit={user => this.setState({ avatar: user.avatar })}
      render={({ handleUpload, uploads, ready }) => (
        <div>
          <input
            type="file"
            disabled={!ready}
            onChange={e => handleUpload(e.currentTarget.files)}
          />

          {uploads.map(upload => {
            switch (upload.state) {
              case "waiting":
                return (
                  <p key={upload.id}>Waiting to upload {upload.file.name}</p>
                );
              case "uploading":
                return (
                  <p key={upload.id}>
                    Uploading {upload.file.name}: {upload.progress}%
                  </p>
                );
              case "error":
                return (
                  <p key={upload.id}>
                    Error uploading {upload.file.name}: {upload.error}
                  </p>
                );
              case "finished":
                return (
                  <p key={upload.id}>Finished uploading {upload.file.name}</p>
                );
            }
          })}
        </div>
      )}
    />

            <p>
              Please enter a 1-2 sentence "resume" summary for your User Profile
            </p>
            <InputGroup>
              <InputGroup.Prepend />
              <FormControl as="textarea" aria-label="With textarea" />
            </InputGroup>
            <br />
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </form>
      </div>
    );
  };

  render() {
    return this.renderEmployerOrCandidateForm();
  }
}
