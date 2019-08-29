import React, { Component } from "react";
import AdminJobEditor from "./AdminJobEditor";
import AdminJobViewer from "./AdminJobViewer";
import AdminJobInstructions from "./AdminJobInstructions";

class AdminJobContent extends Component {
  renderContent = () => {
    if (this.props.latestClick === "EditJob") {
      return (
        <AdminJobEditor
          currUser={this.props.currUser}
          currJob={this.props.currJob}
          currBody={this.props.currBody}
          currTitle={this.props.currTitle}
          editJob={this.props.editJob}
          handleChangeTextArea={this.props.handleChangeTextArea}
          handleChangeInput={this.props.handleChangeInput}
          saveJob={this.props.saveJob}
          cancelJob={this.props.cancelJob}
          disapproveJob={this.props.disapproveJob}
          latestClick={this.props.latestClick}
          
        />
      )
    } else if (this.props.latestClick === "ShowJob") {
      return (
        <AdminJobViewer
          currUser={this.props.currUser}
          currJob={this.props.currJob}
          editJob={this.props.editJob}
          showJob={this.props.showJob}
          deleteJob={this.props.deleteJob}
          latestClick={this.props.latestClick}
        />
      );
      //Cancel job does not mean delete job, simply click cancel btn when in job editor 
    } else if (this.props.latestClick === "CancelJob") {
      return (
        <AdminJobViewer
          currUser={this.props.currUser}
          currJob={this.props.currJob}
          editJob={this.props.editJob}
          cancelJob={this.props.cancelJob}
          showJob={this.props.showJob}
          latestClick={this.props.latestClick}
        />
      )
    } else if (this.props.latestClick === "NewJob") {
      return (
        <AdminJobViewer
          currUser={this.props.currUser}
          currJob={this.props.currJob}
          editJob={this.props.editJob}
          showJob={this.props.showJob}
          latestClick={this.props.latestClick}
        />
      )
    } else {
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
