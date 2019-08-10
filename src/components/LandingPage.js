import React, { Component } from "react";
import LoginHeader from "./LoginHeader";
// import SignUpHeader from "./SignUpHeader"

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currInputLoginUN: "",
      currInputLoginPW: ""
      //isAuth --- use when adding authentication
    };
  }

  //   authenticate = (UN, PW) => {};

  render() {
    return (
      <div>
        <LoginHeader handleChangeInputUN={this.props.handleChangeInputUN} />
      </div>
    );
  }
}

        /* <SignUpHeader handleChangeInputNewUN={this.props.handleChangeInputNewUN} /> */
