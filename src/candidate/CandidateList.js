import React, { Component } from "react"
import CandidateItem from "./CandidateItem"

class CandidateList extends Component {

  

  render() {
     return (
        <ul>
          {this.props.filteredCandidates.map(candidate => (
            <CandidateItem
              currCandidate={candidate}
              showCandidate={this.props.showCandidate}
            />
          ))}
        </ul>
      )
  }
}


export default CandidateList