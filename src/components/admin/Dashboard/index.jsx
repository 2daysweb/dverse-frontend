import React, {Component} from "react"
import { Jumbotron, Container } from "react-bootstrap"
import {withRouter} from 'react-router-dom'

class Dashboard extends Component {

  componentDidMount(){
    this.props.history.push('admindashboard')
  }
  render(){
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to Admin Dashboard--- Be Responsible.</h1>
        </Container>
        <ul>
          <li>Rules for Job Post Approval / Denial</li>
          <li>New Job Posts Count: 1</li>
          <li>New Candidate Interview Requests: 3</li>
          <li>New Candidate Applications: 9</li>
        </ul>
      </Jumbotron>
    </div>
  )
}
}

export default withRouter(Dashboard)
