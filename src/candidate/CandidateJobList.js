import React, { Component } from "react";
import JobItem from "./CandidateJobItem";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchJobs } from "../actions/index";

class CandidateJobList extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  //TODO: Fix re-rendering problem --- prevProps.jobs sometimes undefined --- infinite loop of server calls
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.jobs.slice(-1)[0] !== undefined) {
      if (prevProps.jobs.slice(-1)[0].id !== this.props.jobs.slice(-1)[0].id) {
        this.props.fetchJobs();
      }
    }
  }
  renderJobsOrAppliedJobs = () => {
    //Only render new job btn if clicked Create Job, "/mydraftjobs" path
    if (this.props.location.pathname === "/candidatejobs" && this.getAllApprovedJobs()[0].id === 999) {
      debugger

        return this.getAllApprovedJobs(false);
    }
       else if (this.props.location.pathname === "candidatejobs") {
        return this.getAllApprovedJobs();
      }
    

    return this.getAllMyJobs();
  };

  getAllApprovedJobs = param => {
    let allJobs = this.props.jobs;
    debugger
    if (!param) {
      return [
        {
          id: 999,
          title: "No New Jobs to Apply To!",
          body:
            "Youve applied to all eligible job opportunities, please check in later. Thank you!"
        }
      ];
    }
    let allApprovedJobs = allJobs.filter(job => job.status === "approved");
    return allApprovedJobs;
  };

  getAllMyJobs = () => {
    //Filter all jobs, return jobs belonging to current user
    let currUser = JSON.parse(localStorage.getItem("currUser"));
    let allJobs = this.props.jobs;

    //Filter through all jobs and find where userId is included in Job.users

    let myJobs = allJobs.filter(job =>
      job.users.filter(user => user.id === currUser.id)
    );

    return myJobs;
  };
  renderJobItem = () => {
    debugger;
    return (
      <ul>
        {Object.keys(this.renderJobsOrAppliedJobs()).map(job => {
          return <JobItem currJob={job} showJob={this.props.showJob} />;
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
    jobs: state.jobs.jobs
  };
};

const mapDispatchToProps = dispatch => {
  console.log(fetchJobs());
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
