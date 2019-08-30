import React, { Fragment } from 'react'
import {withRouter} from 'react-router-dom'

const JobViewer = (props) => {
console.log("The Current Location Is:", props.location.pathname)
//Conditionally Render editButtons --- if employer or admin --- yes, delete ---- if candidate can't do it 

let renderActivateOrSubmitBtn = () => {
  if(props.currJob.is_draft){
   return (<span><p>Draft Status: {props.currJob.is_draft.toString().toUpperCase()}</p> <button onClick={()=>props.submitJob(props.currJob)}>Submit Job</button><button onClick={props.editJob}>Edit</button>
   <button onClick={props.deleteJob}>Delete</button></span>) 
  }

  else if (props.currJob.is_approved) {
    return <span><p>Active Status: {props.currJob.is_approved.toString().toUpperCase()}</p> <button onClick={()=>props.activateJob(props.currJob)}>Activate Job</button></span> 
  }

  else {
   return <p>Pending approval........Check back in a few days</p>
  }
}

  return (
    <Fragment>
      <h2>{props.currJob.title}</h2>
      <p>{props.currJob.body}</p>
      
      {renderActivateOrSubmitBtn()}
    
    </Fragment>
  )
}

export default withRouter(JobViewer);
