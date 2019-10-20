import React, { Component, Fragment } from "react";
import Search from "../common/Search";
import CandidateJobContent from "./CandidateJobContent";
import CandidateJobSidebar from "./CandidateJobSidebar";
import { connect } from "react-redux";
import { fetchJobs } from "../actions/index";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

class CandidateJobsContainer extends Component {
  state = {
    latestClick: "",
    currJob: null,
    currBody: "",
    currTitle: ""
  };

  componentDidMount() {
    const { fetchJobs } = this.props;
    fetchJobs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.jobs.slice(-1)[0] !== undefined) {
      if (prevProps.jobs.slice(-1)[0].id !== this.props.jobs.slice(-1)[0].id) {
        this.props.fetchJobs();
      }
    }
  }

  updateJobObj = job => {
    let id = job.id;
    let title = job.title;
    let body = job.body;
    let status = job.status;
    let newJob = { id: id, title: title, body: body, status: status };
    return newJob;
  };

  handleClickApplyBtn = currJob => {
    const { user } = this.props;
    let id = currJob.id;
    let userId = user.id;
    let URL = BASE_URL + "api/v1/jobs/" + id;
    let appliedJob = this.updateJobObj(currJob);
    appliedJob.user_id = userId;

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(appliedJob)
    }).then(response => response.json());
  };

  handleClickShowJob = currJob => {
    this.setState({
      latestClick: "ShowJob",
      currJob: currJob,
      currBody: currJob.body,
      currTitle: currJob.title
    });
  };

  render() {
    return (
      <Fragment>
        <Search latestClick={this.state.latestClick} />
        <div className="container">
          <CandidateJobSidebar
            latestClick={this.state.latestClick}
            currJob={this.state.currJob}
            applyJob={this.handleClickApplyBtn}
            showJob={this.handleClickShowJob}
          />
          <CandidateJobContent
            latestClick={this.state.latestClick}
            currJob={this.state.currJob}
            currTitle={this.state.currTitle}
            currBody={this.state.currBody}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            applyJob={this.handleClickApplyBtn}
            editJob={this.handleClickEditBtn}
            showJob={this.handleClickShowJob}
            cancelJob={this.handleClickCancelBtn}
            newJob={this.handleClickNewBtn}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs.jobs,
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchJobs: () => {
      dispatch(fetchJobs());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CandidateJobsContainer));
