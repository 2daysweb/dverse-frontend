import React from "react";
import JobItem from "./JobItem";
import { connect } from "react-redux";

const JobList = props => {
  return (
    <ul>
      {props.filteredJobs().map(job => (
        <JobItem currJob={job} showJob={props.showJob} />
      ))}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    jobs: state.jobs.jobs
  };
};

export default connect(mapStateToProps)(JobList);
