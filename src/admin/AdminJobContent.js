import React, { Component } from "react";
import JobEditor from "./AdminJobEditor";
import JobViewer from "./AdminJobViewer";
import Instructions from "./AdminJobInstructions";

class AdminJobContent extends Component {
  renderContent = () => {
    if (this.props.latestClick === "ShowJob") {
      return (
        <JobViewer
          latestClick={this.props.latestClick}
          status={this.props.status}
          currJob={this.props.currJob}
          showJob={this.props.showJob}
          approveJob={this.props.approveJob}
          disapproveJob={this.props.disapproveJob}
        />
      );
    } else {
      return <Instructions />;
    }
  };

  render() {
    return (
      <div className="master-detail-element detail">{this.renderContent()}</div>
    );
  }
}

export default AdminJobContent;
