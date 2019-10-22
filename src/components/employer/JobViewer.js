import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

const JobViewer = props => {
  let {
    job,
    withdrawSubmit,
    jobEditBegin,
    submit,
    deleteSelected
  } = props;
  
  let renderButtons = () => {
    let status = job.status;
    switch (status) {
      case "approved":
        return <button>Take Job Post Down</button>;
      case "submitted":
        return (
          <button onClick={() => withdrawSubmit(job)}>
            Withdraw Submission to Drafts
          </button>
        );
      case "draft":
        return (
          <div>
            <button onClick={jobEditBegin}>Edit</button>
            <button onClick={() => submit(job)}>
              Submit For Approval
            </button>
            <button onClick={() => deleteSelected(job.id)}>Delete Job</button>
          </div>
        );
      default:
        return false;
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
