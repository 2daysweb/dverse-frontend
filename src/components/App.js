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
    const userType = user.type;
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
                <NavBar {...props} />
                <AdminHome {...props} />
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
            path="/employerhome"
            render={props => (
              <div>
                <NavBar {...props} />
                <EmployerHome {...props} />
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
            path="/pendingjobs"
            render={props => (
              <div>
                <NavBar />
                <JobsContainer />
              </div>
            )}
          />
          <Route
            exact
            path="/draftjobs"
            render={props => (
              <div>
                <NavBar />
                <JobsContainer {...props} />
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
            path="/profile"
            render={props => (
              <div>
                <NavBar />
                <Profile />
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
