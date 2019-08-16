import React, { Component } from "react";
import JobItem from "./JobItem";
import CandidateItem from "./CandidateItem";

class JobList extends Component {
  //Conditionally Render Job or Candidate Item
  renderCandidateOrJobPosting = () => {
    let currUser = this.props.currUser;
    // //debugger ;
    if (currUser) {
      let userType = currUser.user_type;
      switch (userType) {
        case "employer":
          return (
            <ul>
              {this.props.filteredJobs.map(job => (
                <JobItem currJob={job} showJob={this.props.showJob} />
              ))}
            </ul>
          );

        case "candidate":
          return (
            <ul>
              {this.props.filteredJobs.map(job => (
               <CandidateItem currJob={job} showJob={this.props.showJob} />
              ))}
            </ul>
          );

        case "admin":
          return (
            <ul>
              {this.props.filteredJobs.map(job => (
                <CandidateItem currJob={job} showJob={this.props.showJob} />
              ))}
            </ul>
          );
        default:
          return false;
      }
    } else {
      return null;
    }
  };

  render() {
    return (this.renderCandidateOrJobPosting());
  }
}

export default JobList;
