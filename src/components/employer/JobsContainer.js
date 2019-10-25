import React, { Component, Fragment } from "react";
import Content from "./JobContent";
import JobSidebar from "./JobSidebar";
import {
  createJob,
  deleteSelected,
  editJob,
  fetchJobs,
  setJob,
  updateStatus
} from "../../actions/index.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
    const draftedJobs = jobs.filter(job => job.status === "draft");
    return draftedJobs;
  };
  getSubmittedJobs = () => {
    const { jobs } = this.props;
    const submittedJobs = jobs.filter(job => job.status === "submitted");
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
      updateStatus
    } = this.props;
    return (
      <Fragment>
        <div className="container">
          <JobSidebar
            id={user.id}
            create={createJob}
            filteredJobs={this.getFilteredJobs}
            set={setJob}
          />
          <Content
            user={user}
            latestClick={latestClick}
            job={job}
            body={body}
            title={title}
            cancel={this.handleClickCancelBtn}
            edit={this.editJob}
            deleteSelected={deleteSelected}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            update={updateStatus}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    latestClick: state.jobs.latestClick,
    jobs: state.jobs.jobs,
    job: state.jobs.selectedJob,
    body: state.jobs.body,
    title: state.jobs.title
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createJob: id => {
      dispatch(createJob(id));
    },
    deleteSelected: id => {
      dispatch(deleteSelected(id));
    },
    editJob: job => {
      dispatch(editJob(job));
    },
    fetchJobs: () => {
      dispatch(fetchJobs());
    },
    setJob: job => {
      dispatch(setJob(job));
    },
    updateStatus: (job, status, user) => {
      dispatch(updateStatus(job, status, user))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JobsContainer));
