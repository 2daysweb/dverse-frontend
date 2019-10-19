import React from "react"
import CandidateItem from "./CandidateItem"

function CandidateList(props){
  const {allCandidates, showCandidate} = props 
     return (
        <ul>
          {allCandidates.map(candidate => (
            <CandidateItem
              currCandidate={candidate}
              showCandidate={showCandidate}
            />
          ))}
        </ul>
      )
  }

export default CandidateList
