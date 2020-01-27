import React from "react";
import JobList from "../JobList";
import { withRouter } from "react-router-dom";

function JobSidebar({id, location, create, jobs, setSelected}){
  let  renderNewBtn = () => {
    if (location.pathname === "/draftjobs") {
      return <button onClick={() => create(id)}>New</button>;
    }
  }
    return (
      <div className="master-detail-element sidebar">
        <JobList
          jobs={jobs}
          setSelected={setSelected}
        />
        {renderNewBtn()}
      </div>
    );
}

export default withRouter(JobSidebar);
