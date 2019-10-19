import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

const CandidateJobViewer = props => {
  const { currJob, applyJob } = props;
  const renderApplyBtn = () => {
    return <button onClick={() => applyJob(currJob)}>Apply Job</button>;
  };

  return (
    <Fragment>
      <h2>{currJob.title}</h2>
      <p>{currJob.body}</p>
      {renderApplyBtn()}
    </Fragment>
  );
};

export default withRouter(CandidateJobViewer);
