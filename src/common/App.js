import React, { Component } from "react";
import NavBar from "./Nav";
import LoginPage from "./LoginPage";
import SignUpForm from "./SignUpForm";
import LandingPage from "./LandingPage";
import Applications from "./Applications";
import Profile from "./Profile";
import CandidateHome from "../candidate/CandidateHome";
import CandidateContainer from "./CandidateContainer";
import CandidateJobContainer from "../candidate/CandidateJobContainer";
import AdminHome from "../admin/AdminHome";
import AdminJobsContainer from "../admin/AdminJobsContainer";
import EmployerHome from "../employer/EmployerHome";
import JobsContainer from "../employer/JobsContainer";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currUser: null,
      token: null
    };
  }

  componentDidMount() {
    let token = this.state.token;
    if (token) {
      fetch("https://dverse-staffing-backend.herokuapp.com/api/v1/profile", {
        headers: { Authentication: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(userObj => {
          this.setState({ currUser: userObj });
        });
    }
  }

  updateCurrentUser = (currUser, token=null) => {
    this.setState({ currUser: currUser, token: token });
  };

  //----------------------BEGIN SIGNUP EVENT HANDLERS-------------------------//

  handleSubmitSignup = () => {
    fetch("https://dverse-staffing-backend.herokuapp.com/api/v1/users", {
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

  //--------------------END SIGNUP EVENT HANDLERS-----------------------------------//
  
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
            <EmployerHome />
          </div>
        );

      case "candidate":
        return (
          <div>
            <NavBar
              updateCurrentUser={this.updateCurrentUser}
              currUser={this.state.currUser}
            />
            <CandidateHome />
          </div>
        );

      case "admin":
        return (
          <div>
            <NavBar
              updateCurrentUser={this.updateCurrentUser}
              currUser={this.state.currUser}
            />
            <AdminHome />
          </div>
        );

      default:
        return false;
    }
  };

  render() {
    const { error, loading, jobs } = this.props;
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
            path="/adminhome"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <AdminHome />
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
                <CandidateHome />
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
                <Profile />
              </div>
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
                <EmployerHome />
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
                <CandidateContainer />
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
                <JobsContainer status={"approved"} />
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
                <JobsContainer status={"submitted"} />
              </div>
            )}
          />
          <Route
            exact
            path="/mydraftjobs"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <JobsContainer status={"draft"} />
              </div>
            )}
          />
          <Route
            exact
            path="/jobs"
            render={props => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <JobsContainer />
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
                <AdminJobsContainer status={"submitted"} />
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
                <AdminJobsContainer status={"approved"} />
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
                <CandidateJobContainer />
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
                <Applications />
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
                <Applications />
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

export default App;
