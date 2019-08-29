import React, { Component } from "react";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import NavBar from "./Nav";
import CandidateContainer from "../candidate/CandidateContainer";
import CandidateJobContainer from '../candidate/CandidateJobContainer'
import AdminJobContainer from '../admin/AdminJobContainer'

import JobContainer from "../employer/JobContainer";
import Applications from "./Applications";
import SignUpForm from "./SignUpForm";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import EmployerHome from "../employer/EmployerHome";
import CandidateHome from "../candidate/CandidateHome";
import AdminHome from "../admin/AdminHome";
import Profile from "./Profile";

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
          this.setState({ currUser: userObj });
        });
    }
  }

  //--------------------BEGIN LOGIN CREDENTIALS---------------//

  updateCurrentUser = currUser => {
    this.setState({ currUser: currUser })
  };

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
      .then(data => console.log(data));
  };

  //--------------------END NEW USER SIGN UP INPUTs, SUBMIT SIGNUP DETAILS----------------//

  //Conditionally render portal based on curr user type

  renderPortal = () => {
    let userType = this.state.currUser.user_type;
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
        );

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
        );

      default:
        return false;
    }
  };


  //Conditionally render Employer, Admin, or Candidate Portal If Authenticated --- Else, render Login Page

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
            path="/adminhome"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <AdminHome currUser={this.state.currUser} />
              </div>
            )}
          />
            <Route
            exact
            path="/candidatehome"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <CandidateHome currUser={this.state.currUser} />
              </div>
            )}
          />
          <Route
            exact
            path="/employprofile"
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
            path="/myprofile"
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
            path="/mypendingjobs"
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
            path="/pendingjobs"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <AdminJobContainer currUser={this.state.currUser} getApprovedJobs={false} />
              </div>
            )}
         />
                    <Route
            exact
            path="/approvedjobs"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <AdminJobContainer currUser={this.state.currUser} getApprovedJobs={true} />
              </div>
            )}
         />
                 <Route
            exact
            path="/employjobs"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <JobContainer currUser={this.state.currUser} getApprovedOnly />
              </div>
            )}
         />
             <Route
            exact
            path="/candidatejobs"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <CandidateJobContainer currUser={this.state.currUser} />
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
            path="/apptracker"
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
    );
  }
}

export default withRouter(App);
