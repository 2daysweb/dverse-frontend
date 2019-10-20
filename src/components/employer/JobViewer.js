import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const JobViewer = props => {
  const {
    selectedJob,
    withdrawSubmitJob,
    editJob,
    submitJob,
    deleteJob
  } = props;

  let renderButtons = () => {
    let status = selectedJob.status;

    switch (status) {
      case "approved":
        return <button>Take Job Post Down</button>;
      case "submitted":
        return (
          <button onClick={() => withdrawSubmitJob(selectedJob)}>
            Withdraw Submission to Drafts
          </button>
        );
      case "draft":
        return (
          <div>
            <button onClick={editJob}>Edit Job</button>
            <button onClick={() => submitJob(selectedJob)}>
              Submit For Approval
            </button>
            <button onClick={() => deleteJob(selectedJob)}>Delete Job</button>
          </div>
        );
      default:
        return false;
    }
  };

  return (
    <Fragment>
      <h2>{selectedJob.title}</h2>
      <p>{selectedJob.body}</p>
      {renderButtons()}
    </Fragment>
  );
};

let mapStateToProps = state => {
  return {
    user: state.user.user,
    selectedJob: state.ui.selectedJob
  };
};

export default connect(mapStateToProps)(withRouter(JobViewer));
