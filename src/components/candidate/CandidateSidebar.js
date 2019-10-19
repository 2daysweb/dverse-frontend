import React, { Component } from "react";
import CandidateList from "./CandidateList";

class CandidateSidebar extends Component {
  renderCandidateList = () => {};

  render() {
    return (
      <div className="master-detail-element sidebar">
        <CandidateList
          allCandidates={this.props.allCandidates}
          filteredCandidates={this.props.filteredCandidates}
          showCandidate={this.props.showCandidate}
          editCandidate={this.props.editCandidate}
          currCandidate={this.props.currCandidate}
          deleteCandidate={this.props.deleteCandidate}
          currUser={this.props.currUser}
        />
      </div>
    )
  }
}

export default CandidateSidebar;
