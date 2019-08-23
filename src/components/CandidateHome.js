import React from "react"
import { Jumbotron, Container } from "react-bootstrap"
import {withRouter} from 'react-router-dom'
//Conditionally render Home depending on user_type

 function CandidateHome() {
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to Your Job Seeker Home Page!</h1>
        </Container>
        <ul>
          <li>Learn how to Apply for Job with one click!</li>
          <li>Learn how to Upload your Resume</li>
          <li>Learn how to Create a Profile for Employers to see your skills, and bio!</li>
        </ul>
      </Jumbotron>
    </div>
  )
}

export default withRouter(CandidateHome)
