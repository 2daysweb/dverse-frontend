import React, { Component } from "react"
import LoginPage from "./LoginPage"
import LandingPage from "./LandingPage"
import NavBar from "./Nav"
import CandidateContainer from "./CandidateContainer"
import JobContainer from "./JobContainer"
import Applications from "./Applications"
import SignUpForm from "./SignUpForm"
import LandingNav from "./LandingNav"
import { Switch, Route, Redirect, withRouter } from "react-router-dom"
import EmployerHome from "./EmployerHome"
import CandidateHome from "./CandidateHome"
import AdminHome from "./AdminHome"
import Profile from "./Profile"
import EmployerJobs from "./EmployerJobs"

class App extends Component {
  constructor() {
    super()
    this.state = {
      currUser: null
    }
  }

  //On load of Application, check if JWT exists, if it does, set state of currUser

  componentDidMount() {
    let token = localStorage.getItem("jwt")
    if (token) {
      fetch("http://localhost:3000/api/v1/profile", {
        headers: { Authentication: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(userObj => {
          this.setState({ currUser: userObj })
        })
    }
  }

  //--------------------BEGIN LOGIN CREDENTIALS---------------//

  updateCurrentUser = currUser => {
    this.setState({ currUser: currUser })
  }

  //-----------------END LOGIN CREDENTIALS---------------------------//

  //--------------------BEGIN NEW USER SIGN UP INPUTs, SUBMIT SIGNUP DETAILS----------------//

  handleSubmitSignup = () => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  //--------------------END NEW USER SIGN UP INPUTs, SUBMIT SIGNUP DETAILS----------------//

  //Conditionally render portal based on curr user type

  renderPortal = () => {
    let userType = this.state.currUser.user_type
    switch (userType) {
      case "employer":
        return (
          <div>
            <NavBar
              updateCurrentUser={this.updateCurrentUser}
              currUser={this.state.currUser}
            />
            <EmployerHome currUser={this.state.currUser} />
          </div>
        )

      case "candidate":
        return (
          <div>
            <NavBar
              updateCurrentUser={this.updateCurrentUser}
              currUser={this.state.currUser}
            />
            <CandidateHome currUser={this.state.currUser} />
          </div>
        )

      case "admin":
        return (
          <div>
            <NavBar
              updateCurrentUser={this.updateCurrentUser}
              currUser={this.state.currUser}
            />
            <AdminHome currUser={this.state.currUser} />
          </div>
        )

      default:
        return false
    }
  }
  //If there's a current user, go to renderPortal method with the user_type
  //Else, go to to LoginPage

  //Conditionally render Employer, Admin, or Candidate Portal If Authenticated --- Else, render LandingPage

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/login"
            render={() =>
              this.state.currUser ? (
                this.renderPortal()
              ) : (
                <LoginPage
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={props => (
              <Route
              exact
              path="/"
              render={props => (
                <LoginPage
                  {...props}
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                  handleLoginSubmit={this.handleLoginSubmit}
                  handleSignupSubmit={this.handleSignUpSubmit}
                />
              )}
            />
  
            )}
          />
          <Route
            exact
            path="/"
            render={props => (
              <LandingPage
                {...props}
                handleLoginSubmit={this.handleLoginSubmit}
                handleSignupSubmit={this.handleSignUpSubmit}
              />
            )}
          />

          <Route
            exact
            path="/employhome"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <EmployerHome currUser={this.state.currUser} />
              </div>
            )}
          />
          <Route
            exact
            path="/profile"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <Profile currUser={this.state.currUser} />
              </div>
            )}
          />
          <Route
            exact
            path="/candidates"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <CandidateContainer currUser={this.state.currUser} />
              </div>
            )}
          />
          <Route
            exact
            path="/employerjobs"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <JobContainer currUser={this.state.currUser} />
              </div>
            )}
          />
          <Route
            exact
            path="/applications"
            render={() => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <Applications currUser={this.state.currUser} />
              </div>
            )}
          />

          <Route
            exact
            path="/signup"
            component={props => <SignUpForm {...props} />}
          />
          <Route
            exact
            path="/"
            render={() =>
              this.state.currUser ? (
                this.renderPortal()
              ) : (
                <Redirect to="/landing" />
              )
            }
          />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)

//Highest impact changes to make:

//1. DONE---------DONE------Landing page routes properly----DONE------
//2.) DONE---------DONE------Remove the check box from the signup form-------DONE---------DONE------
//2.5) Update the NavBar in EmployerPortalContainer to look halfway decent
//3.) Update signup form to include data from signup from
//4.) Update the User controller to set user data once there
//5.) Create an Employer Home component that is first view on login, Repeat for Candidate
//6.) Update UserModel to include a field for candidate_name
