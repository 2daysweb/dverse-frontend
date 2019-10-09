import React, { Component } from "react";
import JobEditor from "./JobEditor";
import JobViewer from "./JobViewer";
import JobInstructions from "./JobInstructions";
import updateLatestClick from '../index'

class JobContent extends Component {
  renderContent = () => {
    if (this.props.latestClick === "EditJob") {
      return (
        <JobEditor
          currJob={this.props.currJob}
          currBody={this.props.currBody}
          currTitle={this.props.currTitle}
          editJob={this.props.editJob}
          handleChangeTextArea={this.props.handleChangeTextArea}
          handleChangeInput={this.props.handleChangeInput}
          saveJob={this.props.saveJob}
          cancelJob={this.props.cancelJob}
          latestClick={this.props.latestClick}
        />
      );
    } else if (this.props.latestClick === "ShowJob") {
      return (
        <JobViewer
          currJob={this.props.currJob}
          editJob={this.props.editJob}
          showJob={this.props.showJob}
          deleteJob={this.props.deleteJob}
          latestClick={this.props.latestClick}
          submitJob={this.props.submitJob}
          status={this.props.status}
          submitJob={this.props.submitJob}
          withdrawSubmitJob={this.props.withdrawSubmitJob}
        />
      );
    } else if (this.props.latestClick === "CancelJob") {
      return (
        <JobViewer
          currJob={this.props.currJob}
          editJob={this.props.editJob}
          cancelJob={this.props.cancelJob}
          showJob={this.props.showJob}
          latestClick={this.props.latestClick}
        />
      );
    } else if (this.props.latestClick === "NewJob") {
      return (
        <JobViewer
          currJob={this.props.currJob}
          editJob={this.props.editJob}
          showJob={this.props.showJob}
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



export default JobContent;
