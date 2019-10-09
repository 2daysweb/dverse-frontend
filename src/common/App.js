import React, { Component } from "react";
import NavBar from "./Nav";
import Login from "./Login";
import SignUpForm from "./SignUpForm";
import Landing from "./Landing";
import Profile from "./Profile";
import CandidateHome from "../candidate/CandidateHome";
import CandidateContainer from "./CandidateContainer";
import CandidateJobContainer from "../candidate/CandidateJobContainer";
import AdminHome from "../admin/AdminHome";
import AdminJobsContainer from "../admin/AdminJobsContainer";
import EmployerHome from "../employer/EmployerHome";
import JobsContainer from "../employer/JobsContainer";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends Component {

  renderPortal = () => {
    let userType = this.props.user.user_type;
    switch (userType) {
      case "employer":
     
        return (
          <div>
            <NavBar />
            <EmployerHome />
          </div>
        );
      case "candidate":
        return (
          <div>
            <NavBar />
            <CandidateHome />
          </div>
        );
      case "admin":
        return (
          <div>
            <NavBar />
            <AdminHome />
          </div>
        );
      default:
        return false;
    }
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/login"
            render={() =>
              this.props.loggedIn ? this.renderPortal() : <Login />
            }
          />
          <Route
            exact
            path="/"
            render={props => (
              <Landing
                {...props}
                handleSignupSubmit={this.handleSignUpSubmit}
              />
            )}
          />

          <Route
            exact
            path="/adminhome"
            render={props => (
              <div>
                <NavBar  {...props} />
                <AdminHome {...props}/>
              </div>
            )}
          />
          <Route
            exact
            path="/employerhome"
            render={props => (
              <div>
                <NavBar {...props}/>
                <EmployerHome {...props}/>
              </div>
            )}
          />
          <Route
            exact
            path="/candidatehome"
            render={props => (
              <div>
                <NavBar />
                <CandidateHome />
              </div>
            )}
          />

          <Route
            exact
            path="/myprofile"
            render={props => (
              <div>
                <NavBar />
                <Profile />
              </div>
            )}
          />

          <Route
            exact
            path="/candidates"
            render={() => (
              <div>
                <NavBar />
                <CandidateContainer />
              </div>
            )}
          />
          <Route
            exact
            path="/employjobs"
            render={props => (
              <div>
                <NavBar />
                <JobsContainer />
              </div>
            )}
          />
          <Route
            exact
            path="/mypendingjobs"
            render={props => (
              <div>
                <NavBar />
                <JobsContainer />
              </div>
            )}
          />
          <Route
            exact
            path="/mydraftjobs"
            render={props => (
              <div>
                <NavBar />
                <JobsContainer {...props} />
              </div>
            )}
          />
          <Route
            exact
            path="/pendingjobs"
            render={props => (
              <div>
                <NavBar />
                <AdminJobsContainer />
              </div>
            )}
          />
          <Route
            exact
            path="/approvedjobs"
            render={props => (
              <div>
                <NavBar />
                <AdminJobsContainer />
              </div>
            )}
          />
          <Route
            exact
            path="/candidatejobs"
            render={props => (
              <div>
                <NavBar />
                <CandidateJobContainer />
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
              this.props.user ? this.renderPortal() : <Redirect to="/landing" />
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state, "IN APP MAP STATE TO PROPS");
  return {
    loggedIn: state.user.loggedIn,
    user: state.user.user,
    token: state.user.token
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
