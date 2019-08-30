import React, { Component } from "react";
import AdminJobEditor from "./AdminJobEditor";
import AdminJobViewer from "./AdminJobViewer";
import AdminJobInstructions from "./AdminJobInstructions";

class AdminJobContent extends Component {
  renderContent = () => {
     if (this.props.latestClick === "ShowJob") {
      return (
        <AdminJobViewer
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
      return <AdminJobInstructions />
    }
  }

  render() {
    return (
      <div className="master-detail-element detail">{this.renderContent()}</div>
    )
  }
}

export default AdminJobContent
