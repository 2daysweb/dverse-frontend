import React from "react";
import { withRouter } from "react-router-dom";

const JobViewer = ({ location, user, job, deleteSelected, edit, update }) => {
  const renderButtons = () => {
    const {pathname} = location
    switch (pathname) {
      case "/pendingjobs":
        const drafted = "drafted";
        return (
          <button onClick={() => update(job, drafted, user)}>
            Withdraw Submission to Drafts
          </button>
        );
      case "/draftjobs":
        const submitted = "submitted";
        return (
          <div>
            <button onClick={() => edit(job)}>Edit</button>
            <button onClick={() => update(job, submitted, user)}>
              Submit For Approval
            </button>
            <button onClick={() => deleteSelected(job.id)}>Delete</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h2>{job.title}</h2><li>Status: {job.status}</li>
      <p>{job.body}</p>
      {renderButtons()}
    </>
  );
};

export default withRouter(JobViewer);
