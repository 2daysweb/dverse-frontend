import React, { Component } from "react";
import JobEditor from "./JobEditor";
import JobInstructions from "./JobInstructions";
import JobViewer from "./JobViewer";

class JobContent extends Component {
  renderContent = () => {
    const {
      latestClick,
      handleChangeInput,
      handleChangeTextArea,
      cancel,
      edit
    } = this.props;
    if (latestClick === "Edit") {
      return (
        <JobEditor
          edit={edit}
          handleChangeTextArea={handleChangeTextArea}
          handleChangeInput={handleChangeInput}
          cancel={cancel}
        />
      );
    } else if (latestClick === "Show") {
      const { job, submit,update, deleteSelected } = this.props;
      return (
        <JobViewer
          job={job}
          deleteSelected={deleteSelected}
          edit={edit}
          submit={submit}
          update={update}
        />
      );
    } else if (latestClick === "Cancel") {
      return <JobViewer />;
    } else if (latestClick === "New") {
      return <JobViewer />;
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
