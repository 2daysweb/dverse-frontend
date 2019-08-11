import React, { Component } from "react";
import LoginHeader from "./LoginHeader";
// import SignUpHeader from "./SignUpHeader"

export default class LandingPage extends Component {

  render() {
    return (
      <div>
        <LoginHeader handleChangeInputUN={this.props.handleChangeInputUN}
                handleChangeInputPW={this.props.handleChangeInputPW}
                currInputLoginUN={this.props.state.currInputLoginUN}
                currInputLoginPW={this.props.state.currInputLoginPW}
                handleLoginSubmit={this.props.handleLoginSubmit}

         />
      </div>
    );
  }
}

        /* <SignUpHeader handleChangeInputNewUN={this.props.handleChangeInputNewUN} /> */
