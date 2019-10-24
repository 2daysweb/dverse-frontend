import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

const JobViewer = props => {
  let { job, deleteSelected, edit, submit, update } = props;
 
  let renderButtons = () => {
    let status = job.status;
    switch (status) {
      case "approved":
        return <button>Take Job Post Down</button>;
      case "submitted":
      const drafted = "drafted"
        return (
          <button onClick={() => update(job, drafted)}>
            Withdraw Submission to Drafts
          </button>
        );
      case "draft":
      const submitted = "submitted"
        return (
          <div>
            <button onClick={() => edit(job)}>Edit</button>
            <button onClick={() => update(job, submitted)}> Submit For Approval</button>
            <button onClick={() => deleteSelected(job.id)}>Delete</button>
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
