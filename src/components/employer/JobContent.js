import React from "react";
import JobEditor from "./JobEditor";
import JobInstructions from "./JobInstructions";
import JobViewer from "./JobViewer";

const JobContent = (props) => {
  let renderContent = () => {
    const { latestClick, user } = props;
    if (latestClick === "Edit") {
      const { handleChangeInput, handleChangeTextArea, cancel, edit } = props;
      return (
        <JobEditor
          edit={edit}
          handleChangeTextArea={handleChangeTextArea}
          handleChangeInput={handleChangeInput}
          cancel={cancel}
        />
      );
    } else if (latestClick === "Show") {
      const { job, deleteSelected, edit, submit, update } = props;
      return (
        <JobViewer
          user={user}
          job={job}
          deleteSelected={deleteSelected}
          edit={edit}
          submit={submit}
          update={update}
        />
      );
    } else if (latestClick === "Cancel") {
      return <JobViewer user={user} />;
    } else if (latestClick === "New") {
      return <JobViewer user={user} />;
    } else {
      return <JobInstructions />;
    }
  };
  return <div className="master-detail-element detail">{renderContent()}</div>;
}

export default JobContent;
