import React, { Component } from "react"
import CandidateJobItem from "./CandidateJobItem"


class CandidateJobList extends Component {
  //Conditionally Render Job or Job Item
  renderCandidateJobItem = () => {
          return (
            <ul>
              {this.props.approvedJobs.map(job => (
                <CandidateJobItem currJob={job} showJob={this.props.showJob} />
              ))}
            </ul>
          )
        }

  render() {
    return this.renderCandidateJobItem()
  }
}

export default CandidateJobList
