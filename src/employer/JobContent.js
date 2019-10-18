import React, { Component } from "react";
import JobEditor from "./JobEditor";
import JobViewer from "./JobViewer";
import JobInstructions from "./JobInstructions";

class JobContent extends Component {
  renderContent = () => {
    const {
      latestClick,
      currJob,
      currBody,
      currTitle,
      showJob,
      editJob,
      handleChangeInput,
      handleChangeTextArea,
      saveJob,
      cancelJob
    } = this.props;
    if (latestClick === "EditJob") {
      return (
        <JobEditor
          currJob={currJob}
          currBody={currBody}
          currTitle={currTitle}
          editJob={editJob}
          handleChangeTextArea={handleChangeTextArea}
          handleChangeInput={handleChangeInput}
          saveJob={saveJob}
          cancelJob={cancelJob}
          latestClick={latestClick}
        />
      );
    } else if (latestClick === "ShowJob") {
      const { submitJob, withdrawSubmitJob, deleteJob } = this.props;
      return (
        <JobViewer
          currJob={currJob}
          editJob={editJob}
          showJob={showJob}
          deleteJob={deleteJob}
          latestClick={latestClick}
          submitJob={submitJob}
          withdrawSubmitJob={withdrawSubmitJob}
        />
      );
    } else if (latestClick === "CancelJob") {
      return (
        <JobViewer
          currJob={currJob}
          editJob={editJob}
          cancelJob={cancelJob}
          showJob={showJob}
          latestClick={latestClick}
        />
      );
    } else if (latestClick === "NewJob") {
      return (
        <JobViewer
          currJob={currJob}
          editJob={editJob}
          showJob={showJob}
          latestClick={latestClick}
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
