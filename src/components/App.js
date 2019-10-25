import React, { Component } from "react";
import Landing from "./common/Landing";
import NavBar from "./common/Nav";
import Login from "./common/Login";
import SignUpForm from "./common/SignUpForm";
import Profile from "./common/Profile";
import CandidateHome from "./candidate/CandidateHome";
import CandidateJobContainer from "./candidate/CandidateJobContainer";
import AdminHome from "./admin/AdminHome";
import AdminJobsContainer from "./admin/AdminJobsContainer";
import EmployerHome from "./employer/EmployerHome";
import JobsContainer from "./employer/JobsContainer";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  renderPortal = () => {
    const { user } = this.props;
    const userType = user.user_type;
    switch (userType) {
      case "admin":
        return (
          <div>
            <NavBar user={user} />
            <AdminHome />
          </div>
        );
      case "candidate":
        return (
          <div>
            <NavBar user={user} />
            <CandidateHome />
          </div>
        );
      case "employer":
        return (
          <div>
            <NavBar user={user} />
            <EmployerHome />
          </div>
        );

      default:
        return null;
    }
  };

  render() {
    const { loggedIn, user } = this.props;
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/landing"
            render={props => (
              <div>
                <Landing {...props} />
              </div>
            )}
          />
          <Route
            exact
            path="/login"
            render={() => (loggedIn ? this.renderPortal() : <Login />)}
          />

          <Route
            exact
            path="/adminhome"
            render={props => (
              <div>
                <NavBar {...props} user={user} />
                <AdminHome {...props} />
              </div>
            )}
          />
          <Route
            exact
            path="/pendingjobs"
            render={props => (
              <div>
                <NavBar user={user} />
                <JobsContainer user={user} />
              </div>
            )}
          />

          <Route
            exact
            path="/pendingjobs"
            render={props => (
              <div>
                <NavBar user={user} />
                <AdminJobsContainer user={user} />
              </div>
            )}
          />
          <Route
            exact
            path="/approvedjobs"
            render={props => (
              <div>
                <NavBar />
                <AdminJobsContainer user={user} />
              </div>
            )}
          />
          <Route
            exact
            path="/employerhome"
            render={props => (
              <div>
                <NavBar {...props} user={user} />
                <EmployerHome {...props} />
              </div>
            )}
          />
          <Route
            exact
            path="/employjobs"
            render={props => (
              <div>
                <NavBar user={user} />
                <JobsContainer user={user} />
              </div>
            )}
          />

          <Route
            exact
            path="/draftjobs"
            render={props => (
              <div>
                <NavBar user={user} />
                <JobsContainer user={user} {...props} />
              </div>
            )}
          />

          <Route
            exact
            path="/candidatehome"
            render={props => (
              <div>
                <NavBar user={user} />
                <CandidateHome />
              </div>
            )}
          />
          <Route
            exact
            path="/candidatejobs"
            render={props => (
              <div>
                <NavBar user={user} />
                <CandidateJobContainer user={user} />
              </div>
            )}
          />
          <Route
            exact
            path="/profile"
            render={props => (
              <div>
                <NavBar user={user} />
                <Profile user={user} />
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
              user ? this.renderPortal() : <Redirect to="/landing" />
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
