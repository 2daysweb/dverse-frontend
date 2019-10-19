import React from 'react'

export default function JobFilter() {
    return (
        <div className="master-detail-element sidebar">
        <JobFilter
          filteredJobs={this.props.filteredJobs}
          showJob={this.props.showJob}
          editJob={this.props.editJob}
          currJob={this.props.currJob}
          submitJob={this.props.submitJob}
          deleteJob={this.props.deleteJob}
        />
        {this.renderNewBtn()}
      </div>
    )
}

