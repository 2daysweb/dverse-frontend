import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Resume from "../candidate/Resume";

class Profile extends Component {
  render() {
    return (
      <div>
        <Resume />
      </div>
    );
  }
}
export default withRouter(Profile);
