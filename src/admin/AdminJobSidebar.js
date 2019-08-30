import React, { Component } from "react";
import JobList from "./AdminJobList";

class AdminJobSidebar extends Component {
  render() {
    return (
      <div className="master-detail-element sidebar">
        <JobList
          allJobs={this.props.allJobs}
          filteredJobs={this.props.filteredJobs}
          showJob={this.props.showJob}
          editJob={this.props.editJob}
          currJob={this.props.currJob}
          disapproveJob={this.props.disapproveJob}
          deleteJob={this.props.deleteJob}
          currUser={this.props.currUser}
        />
      </div>
    );
  }
}

export default AdminJobSidebar;
