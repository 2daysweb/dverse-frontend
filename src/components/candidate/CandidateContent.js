import React, { Component } from "react";
import CandidateJobViewer from "./CandidateJobViewer";
import CandidateInstructions from "./CandidateInstructions";

class CandidateContent extends Component {
  renderContent = () => {
    const {currCandidate, showCandidate, latestClick, applyBtn} = this.props
    if (latestClick === "ShowCandidate") {
      return (
        <CandidateJobViewer
          currCandidate={currCandidate}
          showCandidate={showCandidate}
          latestClick={latestClick}
          applyBtn={applyBtn}
        />
      );
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
