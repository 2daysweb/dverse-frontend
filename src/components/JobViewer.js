import React, { Fragment } from 'react';

const JobViewer = (props) => {

//Conditionally Render editButtons --- if employer or admin --- yes, delete ---- if candidate can't do it 


  return (
    <Fragment>
      <h2>{props.currJob.title}</h2>
      <p>{props.currJob.body}</p>
      <button onClick={props.editJob}>Edit</button>
      <button onClick={props.cancelJob}>Cancel</button>
      <button onClick={props.deleteJob}>Delete</button>
    </Fragment>
  )
}

export default JobViewer;
