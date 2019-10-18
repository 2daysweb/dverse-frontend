import React, { Component } from "react";
import JobEditor from "./AdminJobEditor";
import JobViewer from "./AdminJobViewer";
import Instructions from "./AdminJobInstructions";

function AdminJobContent(props) {

  const {latestClick, status, currJob, showJob, approveJob, disapproveJob} = props
  
  const renderContent = () => {
    if (latestClick === "ShowJob") {
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
      return <Instructions />;
    }
  };


    return (
      <div className="master-detail-element detail">{renderContent()}</div>
    );
}

export default AdminJobContent;
