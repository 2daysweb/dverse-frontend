import React from "react";
import {connect} from 'react-redux'
import {setJob} from '../../actions/index'
import JobItem from "./JobItem";

const JobList = props => {
  const {setJob, filteredJobs} = props
  return (
    <ul>
      {filteredJobs().map((job)=>(
        <JobItem job={job} setJob={setJob} />
      ))}
    </ul>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setJob: (job) => {
      dispatch(setJob(job));
    }
  };
};

export default connect(null, mapDispatchToProps)(JobList);
