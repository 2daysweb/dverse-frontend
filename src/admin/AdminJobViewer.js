import React, { Fragment } from 'react';

const AdminJobViewer = (props) => {

  //Consider conditional render approve/disapprove

  return (
    <Fragment>
      <h2>{props.currJob.title}</h2>
      <p>{props.currJob.body}</p>
     
     <span><p>Approval Status: {props.currJob.is_approved.toString().toUpperCase()}</p> <button onClick={()=>props.disapproveJob(props.currJob)}>Approve/Disapprove</button></span> 
    </Fragment>
  )
}

export default AdminJobViewer;
