import React, { Component } from "react";
import CandidateJobList from "./CandidateJobList";

class CandidateJobSidebar extends Component {

  render() {
    const {showJob, currJob, applyJob} = this.props
    return (
      <div className="master-detail-element sidebar">
        <CandidateJobList
          showJob={showJob}
          currJob={currJob}
          applyJob={applyJob}
        />
      </div>
    );
  }
}

export default CandidateJobSidebar;
