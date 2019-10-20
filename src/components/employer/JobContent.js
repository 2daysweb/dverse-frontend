import React, { Component } from "react";
import { connect } from "react-redux";
import JobEditor from "./JobEditor";
import JobViewer from "./JobViewer";
import JobInstructions from "./JobInstructions";

class JobContent extends Component {
  renderContent = () => {
    const {
      latestClick,
      currBody,
      currTitle,
      editJob,
      handleChangeInput,
      handleChangeTextArea,
      saveJob,
      cancelJob
    } = this.props;
    if (latestClick === "Edit") {
      return (
        <JobEditor
          currBody={currBody}
          currTitle={currTitle}
          editJob={editJob}
          handleChangeTextArea={handleChangeTextArea}
          handleChangeInput={handleChangeInput}
          saveJob={saveJob}
          cancelJob={cancelJob}
        />
      );
    } else if (latestClick === "Show") {
      const { submitJob, withdrawSubmitJob, deleteJob } = this.props;
      return (
        <JobViewer
          editJob={editJob}
          deleteJob={deleteJob}
          submitJob={submitJob}
          withdrawSubmitJob={withdrawSubmitJob}
        />
      );
    } else if (latestClick === "Cancel") {
      return <JobViewer editJob={editJob} cancelJob={cancelJob} />;
    } else if (latestClick === "New") {
      return <JobViewer editJob={editJob} />;
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
const mapStateToProps = state => {
  return {
    latestClick: state.ui.latestClick
  };
};

export default connect(mapStateToProps)(JobContent);
