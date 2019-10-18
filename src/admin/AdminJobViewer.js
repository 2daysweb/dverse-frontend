import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux'

const AdminJobViewer = props => {
  let renderButtons = () => {
    let currUserType = props.user.user_type;
    let status = props.currJob.status;

    switch (status) {
      case "approved":
        if (currUserType === "employer") {
          return <button>Take Job Post Down</button>;
        } else {
          return (
            <button onClick={() => props.disapproveJob(props.currJob)}>
              Revoke Job Post Approval
            </button>
          );
        }

      case "submitted":
        if (currUserType === "employer") {
          return <button>Withdraw Submission to Drafts</button>;
        } else {
          return (
            <button onClick={() => props.approveJob(props.currJob)}>
              Approve Job Post
            </button>
          );
        }
      default:
        return false;
    }
  };

  return (
    <Fragment>
      <h2>{props.currJob.title}</h2>
      <p>{props.currJob.body}</p>
      {renderButtons()}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(withRouter(AdminJobViewer));
