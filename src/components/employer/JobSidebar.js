import React, { Component } from "react";
import JobList from "./JobList";
import { withRouter } from "react-router-dom";

class JobSidebar extends Component {
  renderNewBtn() {
    const { location, userId, create  } = this.props;
    if (location.pathname === "/draftjobs") {
      return <button onClick={(userId) => create(userId)}>New</button>;
    }
  }

  render() {
    const {
      filteredJobs,
      set
    } = this.props;

    console.log(filteredJobs())
    return (
      <div className="master-detail-element sidebar">
        <JobList
          filteredJobs={filteredJobs}
          set={set}
      
        />
        {this.renderNewBtn()}
      </div>
    );
  }
}

export default withRouter(JobSidebar);
