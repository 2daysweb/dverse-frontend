import React from "react";

const CandidateItem = props => {
  return (
    <div>
      <li onClick={() => props.showCandidate(props.currCandidate)}>
        <p>{props.currCandidate.first_name}</p>
        <h2>{props.currCandidate.last_name}</h2>
      </li>
    </div>
  )
}

export default CandidateItem
