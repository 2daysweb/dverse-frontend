import React from "react";
import JobList from "../JobList";

function JobSidebar(props) {
  const { filteredJobs, showJob, currJob, disapproveJob } = props;

  return (
    <div className="master-detail-element sidebar">
      <JobList
        filteredJobs={filteredJobs}
        showJob={showJob}
        currJob={currJob}
        disapproveJob={disapproveJob}
      />
    </div>
  );
}

export default JobSidebar;
