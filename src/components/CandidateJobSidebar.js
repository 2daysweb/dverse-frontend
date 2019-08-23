import React, { Component } from "react";
import CandidateJobList from "./CandidateJobList";

class CandidateJobSidebar extends Component {

  render() {
    return (
      <div className="master-detail-element sidebar">
        <CandidateJobList
          allJobs={this.props.allJobs}
          filteredJobs={this.props.filteredJobs}
          showJob={this.props.showJob}
          editJob={this.props.editJob}
          currJob={this.props.currJob}
          deleteJob={this.props.deleteJob}
          currUser={this.props.currUser}
        />
      </div>
    )
  }
}

export default CandidateJobSidebar
