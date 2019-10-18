import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

const AdminJobViewer = props => {
  const { currJob, disapproveJob, approveJob } = props;

  let renderButtons = () => {
    let status = currJob.status;

    switch (status) {
      case "approved":
        return (
          <button onClick={() => disapproveJob(currJob)}>
            Revoke Job Post Approval
          </button>
        );

      case "submitted":
        return (
          <button onClick={() => approveJob(currJob)}>Approve Job Post</button>
        );
      default:
        return false;
    }
  };

  return (
    <Fragment>
      <h2>{currJob.title}</h2>
      <p>{currJob.body}</p>
      {renderButtons()}
    </Fragment>
  );
};

export default withRouter(AdminJobViewer);
