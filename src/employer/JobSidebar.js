import React, { Component } from "react";
import JobList from "./JobList";
import { withRouter } from "react-router-dom";

class JobSidebar extends Component {
  renderNewBtn() {
    const { location, newJob } = this.props;
    if (location.pathname === "/mydraftjobs") {
      return <button onClick={newJob}>New</button>;
    }
  }

  render() {
    const {
      filteredJobs,
      showJob,
      editJob,
      currJob,
      submitJob,
      deleteJob
    } = this.props;
    return (
      <div className="master-detail-element sidebar">
        <JobList
          filteredJobs={filteredJobs}
          showJob={showJob}
          editJob={editJob}
          currJob={currJob}
          submitJob={submitJob}
          deleteJob={deleteJob}
        />
        {this.renderNewBtn()}
      </div>
    );
  }
}

export default withRouter(JobSidebar);
