import React, { Fragment } from 'react';

const CandidateJobViewer = (props) => {

  return (
    <Fragment>

      <h2>{props.currJob !== undefined ? props.currJob.title : 'Failed to Load Job'}</h2>
      <p>{props.currJob !== undefined ? props.currJob.body : 'Failed to Load'}</p>
      <button>Apply!</button>
    </Fragment>
  )
}

export default CandidateJobViewer;
