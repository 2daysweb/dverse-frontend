import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

const JobViewer = props => {
  const { location, user, job, deleteSelected, edit, update } = props;
  let renderButtons = () => {
    const pathname = location.pathname;
    switch (pathname) {
      case "/pendingjobs":
        const drafted = "draft";

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
              {" "}
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
    <Fragment>
      <h2>{job.title}</h2>
      <p>{job.body}</p>
      {renderButtons()}
    </Fragment>
  );
};

export default withRouter(JobViewer);
