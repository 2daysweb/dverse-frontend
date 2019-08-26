import React, { Component } from "react";
import CandidateJobViewer from "./CandidateJobViewer";
import CandidateInstructions from "./CandidateInstructions";

class CandidateContent extends Component {
  renderContent = () => {
    if (this.props.latestClick === "ShowCandidate") {
      return (
        <CandidateJobViewer
          currUser={this.props.currUser}
          currCandidate={this.props.currCandidate}
          showCandidate={this.props.showCandidate}
          latestClick={this.props.latestClick}
        />
      );
      //Cancel job does not mean delete job, simply click cancel btn when in job editor 
    }  else {
      return <CandidateInstructions />
    }
  }

  render() {
    return (
      <div className="master-detail-element detail">{this.renderContent()}</div>
    )
  }
}

export default CandidateContent
