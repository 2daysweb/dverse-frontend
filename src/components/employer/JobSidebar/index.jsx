import React from "react";
import JobList from "../JobList";
import { withRouter } from "react-router-dom";

function JobSidebar(props){
  let  renderNewBtn = () => {
    const {  id, location, create  } = props;
    if (location.pathname === "/draftjobs") {
      return <button onClick={() => create(id)}>New</button>;
    }
  }
    const {
      jobs,
      setSelected
    } = props;
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
