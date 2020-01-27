import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import JobContent from "../../../components/employer/JobContent";
import JobSidebar from "../../../components/employer/JobSidebar";
import {createJob, deleteJob, editJob, editCancel, saveJob, fetchJobs, setSelected, updateStatus } from "../../../actions";
import { getVisibleJobs } from "../../../reducers/jobsReducer";

class JobsContainer extends Component {
  componentDidMount = () => {
    const { fetchJobs } = this.props;
    fetchJobs();
  };
  render() {
    const { user, latestClick, job, jobs, body, title, create, deleteJob, cancel, edit, save, setSelected, updateStatus } = this.props;
    return (
      <>
        <div className={'container'}>
          <JobSidebar
            id={user.id}
            jobs={jobs}
            create={create}
            setSelected={setSelected}
          />
          <JobContent
            user={user}
            latestClick={latestClick}
            job={job}
            body={body}
            title={title}
            cancel={cancel}
            edit={edit}
            save={save}
            deleteSelected={deleteJob}
            update={updateStatus}
          />
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  const {
    jobs: { latestClick, jobs, selectedJob, body, title }, visibilityFilter} = state;
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
    create: id => {
      dispatch(createJob(id));
    },
    deleteJob: id => {
      dispatch(deleteJob(id));
    },
    edit: () => {
      dispatch(editJob());
    },
    cancel: () => {
      dispatch(editCancel());
    },
    fetchJobs: () => {
      dispatch(fetchJobs());
    },
    setSelected: job => {
      dispatch(setSelected(job));
    },
    save: (job, body, title) => {
      dispatch(saveJob(job, body, title))
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
