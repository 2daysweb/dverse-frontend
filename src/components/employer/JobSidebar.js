import React, { Component } from "react";
import JobList from "./JobList";
import { withRouter } from "react-router-dom";

class JobSidebar extends Component {
  renderNewBtn() {
    const { location, newJob } = this.props;
    if (location.pathname === "/draftjobs") {
      return <button onClick={newJob}>New</button>;
    }
  }

  render() {
    const {
      filteredJobs,
      editJob,
      submitJob,
      deleteJob
    } = this.props;
    return (
      <div className="master-detail-element sidebar">
        <JobList
          filteredJobs={filteredJobs}
          editJob={editJob}
          submitJob={submitJob}
          deleteJob={deleteJob}
        />
        {this.renderNewBtn()}
      </div>
    );
  }
}

export default withRouter(JobSidebar);
