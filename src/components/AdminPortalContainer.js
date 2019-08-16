import React, { Component } from 'react'
import PortalContainer from './PortalContainer';

export default class AdminPortalContainer extends Component {
    render() {
        return (
            <div>
                <PortalContainer  currUser={this.props.currUser}/>
            </div>
        )
    }
}
