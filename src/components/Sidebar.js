import React, { Component } from "react";
import JobList from "./JobList";

class Sidebar extends Component {
  // renderNewBtnOrNull = () => {
  //   if (this.props.location.pathname === "jobs") {
  //     
  //   } else {
  //     return null
  //   }
  // }

  //Conditionally render JobList depending on if Employer or Candidate or Admin (No Edit for Candidates) 
 //Conditionally Render a List of Job without an edit Btn --- for candidate portal 
 //Conditionally Render a List of Candidates (Users where type==Candidate) without an edit Btn --- for Employer Portal
 //Conditionally Render a List of My Jobs ("Add or Edit Jobs") which renders based on employer ID ---- for Employer Portal
   

  render() {
    return (
      <div className="master-detail-element sidebar">
        <JobList
          allJobs={this.props.allJobs}
          filteredJobs={this.props.filteredJobs}
          showJob={this.props.showJob}
          editJob={this.props.editJob}
          currJob={this.props.currJob}
          deleteJob={this.props.deleteJob}
          currUser={this.props.currUser}
        />
       <button onClick={this.props.newJob}>New</button>
      </div>
    )
  }
}

export default Sidebar;
