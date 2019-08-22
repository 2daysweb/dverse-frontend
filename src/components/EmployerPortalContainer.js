import React, { Component } from "react";
import MainContainer from "./MainContainer";
import { Redirect } from "react-router-dom";

export default class EmployerPortalContainer extends Component {
  renderPortalOrLogin = () => {
    if (this.props.currUser) {
      return (
        <MainContainer
          currUser={this.props.currUser}
          updateCurrentUser={this.props.updateCurrentUser}
        />
      );
    } else {
      return <Redirect to="login" />;
    }
  };

  render() {
    return <div>{this.renderPortalOrLogin()}</div>;
  }
}
