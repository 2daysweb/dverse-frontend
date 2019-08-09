import React, { Component } from 'react';
import JobList from './JobList';

class Sidebar extends Component {
  render() {
    return (
      <div className='master-detail-element sidebar'>
        <JobList  
                 allJobs={this.props.allJobs}
                 filteredJobs={this.props.filteredJobs}
                 showJob={this.props.showJob}
                 editJob={this.props.editJob}
                 currJob={this.props.currJob}

        />
        <button onClick={this.props.newJob}>New</button>
      </div>
    );
  }
}

export default Sidebar;
