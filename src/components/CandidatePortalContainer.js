import React, { Component } from 'react'
import PortalContainer from './PortalContainer'

export default class CandidatePortalContainer extends Component {
  render() {
    return (
      <div>
        <PortalContainer currUser={this.props.currUser} updateCurrentUser={this.props.updateCurrentUser} />
      </div>
    )
  }
}
