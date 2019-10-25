import React from "react";
import JobList from "./JobList";
import { withRouter } from "react-router-dom";

function JobSidebar(props){
  let  renderNewBtn = () => {
    const {  id, location, create  } = props;
    if (location.pathname === "/draftjobs") {
      return <button onClick={() => create(id)}>New</button>;
    }
  }
    const {
      filteredJobs,
      set
    } = props;
    return (
      <div className="master-detail-element sidebar">
        <JobList
          filteredJobs={filteredJobs}
          set={set}
        />
        {renderNewBtn()}
      </div>
    );
}

export default withRouter(JobSidebar);
