import React, { Component } from "react";
import JobList from "./AdminJobList";

class AdminJobSidebar extends Component {
  render() {
    return (
      <div className="master-detail-element sidebar">
        <JobList
          filteredJobs={this.props.filteredJobs}
          showJob={this.props.showJob}
          currJob={this.props.currJob}
          disapproveJob={this.props.disapproveJob}
          deleteJob={this.props.deleteJob}
        />
      </div>
    );
  }
}

export default AdminJobSidebar;
