import React, { Component } from "react";
import JobEditor from "./JobEditor";
import JobViewer from "./JobViewer";
import Applications from './Applications'
import Instructions from "./Instructions";

/*
  Advice: If you cannot figure out how to get this component to work,
          move th e div and renderContent up into JobContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/

class Content extends Component {
  
  renderContent = latestClick => {

    if (this.props.latestClick === "EditJob") {
      return (
        <JobEditor
          currJob={this.props.currJob}
          currBody={this.props.currBody}
          currTitle={this.props.currTitle}
          editJob={this.props.editJob}
          handleChangeTextArea={this.props.handleChangeTextArea}
          handleChangeInput={this.props.handleChangeInput}
          saveJob={this.props.saveJob}
          latestClick={this.props.latestClick}
        />
      );
    } else if (this.props.latestClick === "ShowJob") {
      return (
        <JobViewer
          currJob={this.props.currJob}
          editJob={this.props.editJob}
          showJob={this.props.showJob}
          latestClick={this.props.latestClick}
        />
      );
    } else if (this.props.latestClick === "CancelJob") {
      return (
        <JobViewer
          currJob={this.props.currJob}
          editJob={this.props.editJob}
          cancelJob={this.props.cancelJob}
          showJob={this.props.showJob}
          latestClick={this.props.latestClick}
        />
      );
    } else if (this.props.latestClick === "NewJob") {
      return (
        <JobViewer
          currJob={this.props.currJob}
          editJob={this.props.editJob}
          showJob={this.props.showJob}
          latestClick={this.props.latestClick}
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

export default Content;
//Add the Applications conditionally OROROROR BROWSER ROUTER!!!