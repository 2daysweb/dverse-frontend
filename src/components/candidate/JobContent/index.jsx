import React from "react";
import JobViewer from "../JobViewer";
import JobInstructions from "../JobInstructions";

const JobContent = props => {
  const renderContent = () => {
    if (props.latestClick === "ShowJob") {
      const { currUser, currJob, showJob, applyJob, latestClick } = props;
      return (
        <JobViewer
          currUser={props.currUser}
          currJob={props.currJob}
          showJob={props.showJob}
          applyJob={props.applyJob}
          latestClick={props.latestClick}
        />
      );
    } else {
      return <JobInstructions />;
    }
  };
  return (
    <div className="master-detail-element detail">{renderContent()}</div>
  );
};

export default JobContent;
