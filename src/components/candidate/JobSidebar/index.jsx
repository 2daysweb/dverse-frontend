import React from "react";
import JobList from "../JobList";

const JobSidebar = (props) => {
  const { showJob, currJob, applyJob } = props;
  return (
    <div className="master-detail-element sidebar">
      <JobList
        showJob={showJob}
        currJob={currJob}
        applyJob={applyJob}
      />
    </div>
  );
};

export default JobSidebar;
