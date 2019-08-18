import React, { Component } from "react";
import PortalContainer from "./PortalContainer";
import {Redirect} from 'react-router-dom'

export default class EmployerPortal extends Component {
  
  renderPortalOrLogin = () => {
      if(this.props.currUser){
        return <PortalContainer currUser={this.props.currUser} updateCurrentUser={this.props.updateCurrentUser} />
      }

      else {
        return <Redirect to='login'/>
      }
  }
  
  
  render() {
    return (
      <div>
        {this.renderPortalOrLogin()}
      </div>
    );
  }
}