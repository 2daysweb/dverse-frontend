import React, { Component } from "react";
import CandidateJobList from "./CandidateJobList";

class CandidateJobSidebar extends Component {
 
  render() {
    return (
      <div className="master-detail-element sidebar">
        <CandidateJobList
          allJobs={this.props.allJobs}
          approvedJobs={this.props.approvedJobs}
          showJob={this.props.showJob}
          currJob={this.props.currJob}
        />
      </div>
    )
  }
}

export default CandidateJobSidebar
