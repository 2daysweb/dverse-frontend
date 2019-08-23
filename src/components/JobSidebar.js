import React, { Component } from "react";
import JobList from "./JobList";

class JobSidebar extends Component {

  render() {
    return (
      <div className="master-detail-element sidebar">
        <JobList
          allJobs={this.props.allJobs}
          filteredJobs={this.props.filteredJobs}
          showJob={this.props.showJob}
          editJob={this.props.editJob}
          currJob={this.props.currJob}
          deleteJob={this.props.deleteJob}
          currUser={this.props.currUser}
        />
       <button onClick={this.props.newJob}>New</button>
      </div>
    )
  }
}

export default JobSidebar;
