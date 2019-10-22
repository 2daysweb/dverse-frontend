import React, { Component, Fragment } from "react";
import Content from "./JobContent";
import JobSidebar from "./JobSidebar";
import {
  createJob,
  deleteSelected as deleteSelected,
  editJob,
  fetchJobs,
  setJob
} from "../../actions/index.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

class JobsContainer extends Component {
  componentDidMount = () => {
    const { fetchJobs } = this.props;
    fetchJobs();
  };

  getApprovedJobs = () => {
    const { jobs } = this.props;
    let approvedJobs = jobs.filter(job => job.status === "approved");
    return approvedJobs;
  };
  getDraftedJobs = () => {
    const { jobs } = this.props;
    let statusJobs = jobs.slice(0, -1);
    let draftedJobs = statusJobs.filter(job => job.status === "draft");
    return draftedJobs;
  };
  getSubmittedJobs = () => {
    const { jobs } = this.props;
    let submittedJobs = jobs.filter(job => job.status === "submitted");
    return submittedJobs;
  };
  getFilteredJobs = () => {
    const { location } = this.props;
    const pathname = location.pathname;
    switch (pathname) {
      case "/pendingjobs":
        return this.getSubmittedJobs();
      case "/employjobs":
        return this.getApprovedJobs();
      case "/draftjobs":
        return this.getDraftedJobs();
      default:
        return this.getDraftedJobs();
    }
  };

  submit = () => {
    const { job } = this.props;
    const id = job.id;
    let submittedJob = this.updateJob(job);
    submittedJob.status = "submitted";

    return fetch(BASE_URL + "api/v1/jobs/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(submittedJob)
    }).then(response => response.json());
  };

  withdrawSubmission = () => {
    const { job } = this.props;
    let withdrawnJob = this.updateJob(job);
    withdrawnJob.status = "draft";
    let id = job.id;

    let URL = BASE_URL + "api/v1/jobs/" + id;
    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(withdrawnJob)
    }).then(response => response.json());
  };


  render() {
    const {
      user,
      latestClick,
      job,
      body,
      title,
      createJob,
      deleteSelected,
      setJob,
      editJob
    } = this.props;
    return (
      <Fragment>
        <div className="container">
          <JobSidebar
            userId={user.id}
            create={createJob}
            filteredJobs={this.getFilteredJobs}
            set={setJob}
          />
          <Content
            latestClick={latestClick}
            job={job}
            body={body}
            title={title}
            cancel={this.handleClickCancelBtn}
            deleteSelected={deleteSelected}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            edit={this.editJob}
            submit={this.submit}
            withdrawSubmit={this.withdrawSubmission}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    latestClick: state.ui.latestClick,
    jobs: state.jobs.jobs,
    job: state.ui.selectedJob,
    body: state.ui.body,
    title: state.ui.title
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createJob: job => {
      dispatch(createJob(job));
    },
    deleteSelected: id => {
      dispatch(deleteSelected(id));
    },
    fetchJobs: () => {
      dispatch(fetchJobs());
    },
    setJob: job => {
      dispatch(setJob(job));
    },
    editJob: job => {
      dispatch(editJob(job));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JobsContainer));
