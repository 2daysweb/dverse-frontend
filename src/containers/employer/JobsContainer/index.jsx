import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import JobContent from "../../../components/employer/JobContent";
import Footer from "../../../components/common/Footer";
import JobSidebar from "../../../components/employer/JobSidebar";
import {
  createJob,
  deleteSelected,
  editJob,
  fetchJobs,
  setSelected,
  setVisibilityFilter,
  updateStatus
} from "../../../actions";
import { getVisibleJobs } from "../../../reducers/jobsReducer";

class JobsContainer extends Component {
  componentDidMount = () => {
    const { fetchJobs } = this.props;
    fetchJobs();
  };

  render() {
    const {
      user,
      latestClick,
      job,
      jobs,
      body,
      title,
      createJob,
      deleteSelected,
      setSelected,
      setVisibilityFilter,
      updateStatus
    } = this.props;

    return (
      <Fragment>
        <Footer setFilter={setVisibilityFilter} />
        <div className="container">
          <JobSidebar
            id={user.id}
            jobs={jobs}
            create={createJob}
            setSelected={setSelected}
          />
          <JobContent
            user={user}
            latestClick={latestClick}
            job={job}
            body={body}
            title={title}
            deleteSelected={deleteSelected}
            update={updateStatus}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {
    jobs: { latestClick, jobs, selectedJob, body, title },
    visibilityFilter
  } = state;

  return {
    latestClick: latestClick,
    jobs: getVisibleJobs(jobs, visibilityFilter),
    job: selectedJob,
    body: body,
    title: title
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
    setVisibilityFilter: filter => {
      dispatch(setVisibilityFilter(filter));
    },
    setSelected: job => {
      dispatch(setSelected(job));
    },
    updateStatus: (job, status, user) => {
      dispatch(updateStatus(job, status, user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JobsContainer));
