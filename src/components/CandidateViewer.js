import React, { Fragment } from "react";

const CandidateViewer = props => {
  //Conditionally Render editButtons --- if employer or admin --- yes, delete ---- if candidate can't do it

    // combineFirstLastName = () => {
    //     props.currCandidate.firs
    // }

  return (
    <Fragment>
      <h2>{props.currCandidate}</h2>
      <p>{props.currCandidate.body}</p>
    
    </Fragment>
  );
};

export default CandidateViewer;
