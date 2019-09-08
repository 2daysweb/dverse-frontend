import React, { Component } from "react";
import CandidateJobViewer from "./CandidateJobViewer";
import JobInstructions from "../employer/JobInstructions";

class CandidateJobContent extends Component {
  renderContent = () => {
    if (this.props.latestClick === "ShowJob") {
      return (
        <CandidateJobViewer
          currUser={this.props.currUser}
          currJob={this.props.currJob}
          showJob={this.props.showJob}
          applyJob = {this.props.applyJob}
          latestClick={this.props.latestClick}
        />
      );
      //Cancel job does not mean delete job, simply click cancel btn when in job editor
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
