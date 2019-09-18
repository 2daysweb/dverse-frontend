import React, { Component } from "react";
import CandidateJobList from "./CandidateJobList";

class CandidateJobSidebar extends Component {

  render() {
    return (
      <div className="master-detail-element sidebar">
        <CandidateJobList
          showJob={this.props.showJob}
          currJob={this.props.currJob}
          applyJob={this.props.applyJob}
          approvedJobs={this.approvedJobs}
        />
      </div>
    );
  }
}

export default CandidateJobSidebar;
