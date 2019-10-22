import React, { Component } from "react";
import JobItem from "./CandidateJobItem";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchJobs } from "../../actions/index";

class CandidateJobList extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.jobs.slice(-1)[0] !== undefined) {
      if (prevProps.jobs.slice(-1)[0].id !== this.props.jobs.slice(-1)[0].id) {
        this.props.fetchJobs();
      }
    }
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

  renderJobItem = () => {
    const { showJob } = this.props;
    return (
      <ul>
        {this.getAllApprovedJobs().map(job=> {
          return <JobItem currJob={job} showJob={showJob} />;
        })}
      </ul>
    );
  };

  render() {
    return this.renderJobItem();
  }
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs.jobs,
    user: state.user.user
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
)(withRouter(CandidateJobList));
