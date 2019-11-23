import React from "react";
import { logout } from "../../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Admin from "./Admin";
import Candidate from "./Candidate";
import Employer from "./Employer";
import Landing from "./Landing";
import Login from "./Login";

const NavBar = props => {
  const {
    user,
    history,
    location: { pathname },
  } = props;


  if (pathname === "/admin") {
    return null;
  }
  const logout = () => {
    history.push("/");
    props.logout();
  };

  const renderLoggedOut = () => {
    return pathname === "/" ? <Landing /> : <Login />;
  };

  const renderLoggedIn = () => {
    let userType = user.user_type;
    switch (userType) {
      case "employer":
        return <Employer logout={logout} />;
      case "candidate":
        return <Candidate logout={logout} />;
      case "admin":
        return <Admin logout={logout} />;

      default:
        return null;
    }
  };

  return <div>{user ? renderLoggedIn() : renderLoggedOut()}</div>;
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(NavBar));
