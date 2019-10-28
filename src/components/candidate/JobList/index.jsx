import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchJobs } from "../../../actions";
import Job from "../Job";

class JobList extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  getAllApprovedJobs = () => {
    const { jobs } = this.props;
    const allApprovedJobs = jobs.filter(job => job.status === "approved");
    return allApprovedJobs;
  };

  getAllMyJobs = () => {
    let { jobs } = this.props;
    const myJobs = jobs.filter(job =>
      job.users.filter(u => {
        const { user } = this.props;
        return u.id === user.id;
      })
    );
    return myJobs;
  };

  renderJob = () => {
    const { showJob } = this.props;
    return (
      <ul>
        {this.getAllApprovedJobs().map(job=> {
          return <Job currJob={job} showJob={showJob} />;
        })}
      </ul>
    );
  };

  render() {
    return this.renderJob();
  }
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs.jobs,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchJobs: () => {
      dispatch(fetchJobs());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JobList));
