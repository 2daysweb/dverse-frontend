import React, { Component } from "react";
import JobItem from "./JobItem";

const JobList = props => {
  return (
    <ul>
      {props.filteredJobs.map(job => (
        <JobItem currJob={job} showJob={props.showJob} />
      ))}
    </ul>
  );
};

export default JobList;

