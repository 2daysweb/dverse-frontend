import React, { Fragment } from 'react'
import {withRouter} from 'react-router-dom'

const JobViewer = (props) => {
console.log("The Current Location Is:", props.location.pathname)
//Conditionally Render editButtons --- if employer or admin --- yes, delete ---- if candidate can't do it 

let renderActivateOrSubmitBtn = () => {
  let currUserType = JSON.parse(localStorage.getItem("currUser")).user_type;
  let status = props.status;
  //debugger;
  switch (status) {
    case "approved":
      if (currUserType === "employer") {
        return <button>Take Job Post Down</button>
      } else {
        return <button>Revoke Job Post Approval</button>
      }

    case "submitted":
      if (currUserType === "employer") {
        return <button>Withdraw Submission to Drafts</button>
      } else {
        return <button>Approve Job</button>
      }

    case "draft":
      return <div><button onClick={props.editJob}>Edit Job</button><button>Submit For Approval</button></div>
    default:
      return false;
  }
};


  return (
    <Fragment>
      <h2>{props.currJob.title}</h2>
      <p>{props.currJob.body}</p>
      {renderActivateOrSubmitBtn()}
    
    </Fragment>
  )
}

export default withRouter(JobViewer);
