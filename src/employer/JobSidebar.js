import React, { Component } from "react";
import JobList from "./JobList";
import {withRouter} from 'react-router-dom'

class JobSidebar extends Component {
  renderNewBtn() {
    //only render new btn if in Pending Jobs nav link

    if (this.props.location.pathname === "/mydraftjobs") {
      return <button onClick={this.props.newJob}>New</button>;
    }
  }

  render() {
    return (
      <div className="master-detail-element sidebar">
        <JobList
          allJobs={this.props.allJobs}
          filteredJobs={this.props.filteredJobs}
          showJob={this.props.showJob}
          editJob={this.props.editJob}
          currJob={this.props.currJob}
          submitJob={this.props.submitJob}
          deleteJob={this.props.deleteJob}
          currUser={this.props.currUser}
        />
        {this.renderNewBtn()}
      </div>
    );
  }
}

export default withRouter(JobSidebar);
