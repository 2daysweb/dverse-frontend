import React, { Component } from "react";
import JobList from "./JobList";
import { withRouter } from "react-router-dom";

class JobSidebar extends Component {
  renderNewBtn() {
    //Only render new job btn if clicked Create Job, "/mydraftjobs" path
    if (this.props.location.pathname === "/candidatejobs") {
      return <button onClick={this.props.applyJob}>New</button>;
    }
  }

  render() {
    return (
      <div className="master-detail-element sidebar">
        <JobList
          filteredJobs={this.props.filteredJobs}
          showJob={this.props.showJob}
          editJob={this.props.editJob}
          currJob={this.props.currJob}
          submitJob={this.props.submitJob}
          deleteJob={this.props.deleteJob}
        />
        {this.renderNewBtn()}
      </div>
    );
  }
}

export default withRouter(JobSidebar);
