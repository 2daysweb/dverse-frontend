import React, { Component, Fragment } from "react";
import JobSidebar from "./JobSidebar";
import Content from "./JobContent";
import { connect } from "react-redux";
import { fetchJobs } from "../../actions/index.js";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

class JobsContainer extends Component {
  state = {
    currBody: "",
    currTitle: "",
  };



  componentDidMount = () => {
    const {fetchJobs} = this.props
    fetchJobs();
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {location} = this.props
    if (location.pathname !== prevProps.location.pathname) {
      window.location.reload();
    }
  };


  getApprovedJobs = () => {
    const { jobs } = this.props;
    let approvedJobs = jobs.filter(job => job.status === "approved");
    return approvedJobs;
  };
  getDraftedJobs = () => {
    const { jobs } = this.props;
    let draftedJobs = jobs.filter(job => job.status === "draft");
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
  
  handleChangeTextArea = body => {
    this.setState({ currBody: body });
  };

  handleChangeInput = title => {
    this.setState({ currTitle: title });
  };

  handleClickSubmitBtn = currJob => {
    let id = currJob.id;
    let URL = BASE_URL + "api/v1/jobs/" + id;
    let submittedJob = this.updateJob(currJob);
    submittedJob.status = "submitted";

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(submittedJob)
    })
      .then(response => response.json())
      .then(data => window.location.reload());
  };

  handleClickWithdrawSubmitBtn = currJob => {
    let withdrawnJob = this.updateJob(currJob);
    withdrawnJob.status = "draft";
    let id = currJob.id;

    let URL = BASE_URL + "api/v1/jobs/" + id;
    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(withdrawnJob)
    })
      .then(response => response.json())
      .then(data => window.location.reload());
  };

  handleClickNewBtn = () => {
    let user = this.props.user;
    let userId = user.id;

    let newJob = {
      title: "deafult title",
      body: "deafult body",
      user_id: userId
    };
    let URL = BASE_URL + "api/v1/jobs";

    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newJob)
    })
      .then(response => response.json())
      .then(job => window.location.reload());
  };

  updateJob = job => {
    let user_id = this.props.user.id;
    let id = job.id;
    let title = job.title;
    let body = job.body;
    let status = job.status;
    let newJob = {
      id: id,
      title: title,
      body: body,
      status: status,
      user_id: user_id
    };
    return newJob;
  };

  handleClickSaveBtn = currJob => {
    let id = currJob.id;
    let user_id = this.props.user.id;
    let title = this.state.currTitle;
    let body = this.state.currBody;
    let status = "draft";
    let job = {
      title: title,
      body: body,
      id: id,
      status: status,
      user_id: user_id
    };

    let URL = BASE_URL + "api/v1/jobs/" + id;
    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(job)
    })
      .then(response => response.json())
      .then(window.location.reload());
  };

  handleClickDeleteBtn = () => {
    let id = this.state.currJob.id;
    let URL = BASE_URL + "api/v1/jobs/" + id;
    let job = { id: id };
    return fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(job)
    })
      .then(response => response.json())
      .then(window.location.reload);
  };

  //--------------------END-----------------------------------Event Handlers -------------------------------------------------END-------------------------------//

  render() {
    return (
      <Fragment>
        <div className="container">
          <JobSidebar
            newJob={this.handleClickNewBtn}
            filteredJobs={this.getFilteredJobs}
          />
          <Content
            currTitle={this.state.currTitle}
            currBody={this.state.currBody}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            submitJob={this.handleClickSubmitBtn}
            withdrawSubmitJob={this.handleClickWithdrawSubmitBtn}
            editJob={this.handleClickEditBtn}
            saveJob={this.handleClickSaveBtn}
            cancelJob={this.handleClickCancelBtn}
            deleteJob={this.handleClickDeleteBtn}
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
)(withRouter(JobsContainer));
