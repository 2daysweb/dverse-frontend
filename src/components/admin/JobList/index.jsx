import React from "react";
import Job from "../Job";

const JobList = props => {
  return (
    <ul>
      {props.filteredJobs.map(job => (
        <Job key={job.id} currJob={job} showJob={props.showJob} />
      ))}
    </ul>
  );
};

export default JobList;
