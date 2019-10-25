import React from "react";
import JobItem from "./AdminJobItem";

const AdminJobList = props => {
  return (
    <ul>
      {props.filteredJobs.map(job => (
        <JobItem key={job.id} currJob={job} showJob={props.showJob} />
      ))}
    </ul>
  );
};

export default AdminJobList;
