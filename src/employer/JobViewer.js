import React, { Fragment } from 'react'
import {withRouter} from 'react-router-dom'

const JobViewer = (props) => {
console.log("The Current Location Is:", props.location.pathname)
//Conditionally Render editButtons --- if employer or admin --- yes, delete ---- if candidate can't do it 

let renderActivateJobBtn = () => {
  if(props.currJob.isApproved){
   return <span><p>Active Status: {props.currJob.is_active.toString().toUpperCase()}</p> <button onClick={()=>props.activateJob(props.currJob)}>Activate/Deactiviate</button></span> 
  }

  else {
   return <p>***Job is not approved, please check back later to activate***</p>
  }
}

  return (
    <Fragment>
      <h2>{props.currJob.title}</h2>
      <p>{props.currJob.body}</p>
      <button onClick={props.editJob}>Edit</button>
      <button onClick={props.deleteJob}>Delete</button>
      <button>Submit For Approval</button>
      
      {renderActivateJobBtn()}
    
    </Fragment>
  )
}

export default withRouter(JobViewer);
