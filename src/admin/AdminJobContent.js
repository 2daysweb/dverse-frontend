import React, { Component } from "react";
import JobEditor from "./AdminJobEditor";
import JobViewer from "./AdminJobViewer";
import Instructions from "./AdminJobInstructions";

class AdminJobContent extends Component {
  renderContent = () => {
     if (this.props.latestClick === "ShowJob") {
      return (
        <JobViewer
          currUser={this.props.currUser}
          currJob={this.props.currJob}
          editJob={this.props.editJob}
          showJob={this.props.showJob}
          deleteJob={this.props.deleteJob}
          latestClick={this.props.latestClick}
          status={this.props.status}
          approveJob={this.props.approveJob}
          disapproveJob={this.props.disapproveJob}
          
        />
      );
      //Cancel job does not mean delete job, simply click cancel btn when in job editor 
    }  else {
      return <Instructions />
    }
  }

  render() {
    return (
      <div className="master-detail-element detail">{this.renderContent()}</div>
    )
  }
}

export default AdminJobContent
