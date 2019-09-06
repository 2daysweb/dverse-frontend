import React, { Fragment } from 'react';
import {withRouter} from 'react-router-dom'




const CandidateJobViewer = (props) => {

  let renderApplyBtn = () => {
    //Only render new job btn if clicked Create Job, "/mydraftjobs" path
    if (props.location.pathname === "/candidatejobs") {
      return <button onClick={props.applyJob}>Apply Job</button>;
    }
  }

  return (
    <Fragment>

      <h2>{props.currJob !== undefined ? props.currJob.title : 'Failed to Load Job'}</h2>
      <p>{props.currJob !== undefined ? props.currJob.body : 'Failed to Load'}</p>
      {renderApplyBtn()}
    </Fragment>
  )
}

export default withRouter(CandidateJobViewer);
