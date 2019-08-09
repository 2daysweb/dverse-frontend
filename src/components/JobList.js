import React, { Component } from "react";
import JobItem from "./JobItem";

class JobList extends Component {
  // componentDidUpdate(prevProps){

  // }

  render() {
    return (
      <ul>
        {this.props.filteredJobs.map(job => (
          <JobItem currJob={job} showJob={this.props.showJob} />
        ))}
      </ul>
    );
  }
}

export default JobList;
