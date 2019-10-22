import React from "react";
import JobItem from "./JobItem";

const JobList = props => {
  const { filteredJobs, set } = props;
  return (
    <ul>
      {filteredJobs().length? (filteredJobs().map(job => (
        <JobItem key={job.id} job={job} set={set} />))):(null)
        }
    </ul>
  );
};

export default JobList;
