import React from "react";
import JobViewer from "../JobViewer";
import JobInstructions from "../JobInstructions";
 
const JobContent = props => {
  const {
    latestClick,
    status,
    currJob,
    showJob,
    approveJob,
    disapproveJob
  } = props;

  const renderContent = () => {
    if (latestClick === "Show") {
      return (
        <JobViewer
          latestClick={latestClick}
          status={status}
          currJob={currJob}
          showJob={showJob}
          approveJob={approveJob}
          disapproveJob={disapproveJob}
        />
      );
    } else {
      return <JobInstructions />;
    }
  };

  return <div className="master-detail-element detail">{renderContent()}</div>;
};

export default JobContent;
