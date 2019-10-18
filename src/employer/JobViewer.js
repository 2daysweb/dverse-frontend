import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const JobViewer = props => {
  const {
    user,
    currJob,
    disapproveJob,
    withdrawSubmitJob,
    approveJob,
    editJob,
    submitJob,
    deleteJob
  } = {};

  let renderButtons = () => {
    let currUserType = user.user_type;
    let status = currJob.status;

    switch (status) {
      case "approved":
        if (currUserType === "employer") {
          return <button>Take Job Post Down</button>;
        } else {
          return (
            <button onClick={() => disapproveJob(currJob)}>
              Revoke Job Post Approval
            </button>
          );
        }

      case "submitted":
        if (currUserType === "employer") {
          return (
            <button onClick={() => withdrawSubmitJob(currJob)}>
              Withdraw Submission to Drafts
            </button>
          );
        } else {
          return (
            <button onClick={() => approveJob(currJob)}>Approve Job</button>
          );
        }

      case "draft":
        return (
          <div>
            <button onClick={editJob}>Edit Job</button>
            <button onClick={() => submitJob(currJob)}>
              Submit For Approval
            </button>
            <button onClick={() => deleteJob(currJob)}>Delete Job</button>
          </div>
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

let mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(withRouter(JobViewer));
