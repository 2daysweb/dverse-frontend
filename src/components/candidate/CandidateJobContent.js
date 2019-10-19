import React, { Component } from "react";
import CandidateJobViewer from "./CandidateJobViewer";
import JobInstructions from "../employer/JobInstructions";

class CandidateJobContent extends Component {
  renderContent = () => {
    if (this.props.latestClick === "ShowJob") {
      const {currUser, currJob, showJob, applyJob, latestClick} = this.props
      return (
        <CandidateJobViewer
          currUser={this.props.currUser}
          currJob={this.props.currJob}
          showJob={this.props.showJob}
          applyJob = {this.props.applyJob}
          latestClick={this.props.latestClick}
        />
      );
    } else {
      return <JobInstructions />;
    }
  };

  render() {
    return (
      <div className="master-detail-element detail">{this.renderContent()}</div>
    );
  }
}

export default CandidateJobContent;
