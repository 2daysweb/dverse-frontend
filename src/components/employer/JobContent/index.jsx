import React from "react";
import JobEditor from "../JobEditor";
import JobInstructions from "../JobInstructions";
import JobViewer from "../JobViewer";

const JobContent = ({latestClick, user, job, cancel, edit, save, deleteSelected, submit, update }) => {
  let renderContent = () => {
    if (latestClick === "Edit") {
      return (
        <JobEditor
          job={job}
          cancel={cancel}
          save={save}
          user={user}
        />
      );
    } else if (latestClick === "Show") {
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
