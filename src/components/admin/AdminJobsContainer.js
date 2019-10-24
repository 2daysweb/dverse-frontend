import React, { Component, Fragment } from "react";
import AdminJobContent from "./AdminJobContent";
import AdminJobSidebar from "./AdminJobSidebar";
import { fetchJobs } from '../../actions/index.js';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

class AdminJobsContainer extends Component {
  state = {
    currJob: null,
    currBody: "",
    currTitle: "",
    latestClick: "",
    searchText: ""
  };

  componentDidMount() {
    const { fetchJobs } = this.props;
    fetchJobs();
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      window.location.reload();
    }
  }

  getAllApprovedJobs = () => {
    const { jobs } = this.props;
    let allJobs = jobs;
    let allApprovedJobs = allJobs.filter(job => job.status === "approved");
    return allApprovedJobs;
  };

  getAllSubmittedJobs = () => {
    const { jobs } = this.props;
    let allJobs = jobs;
    let allSubmittedJobs = allJobs.filter(job => job.status === "submitted");
    return allSubmittedJobs;
  };

  getFilteredJobs = () => {
    const { location } = this.props;
    let pathname = location.pathname;

    switch (pathname) {
      case "/pendingjobs":
        return this.getAllSubmittedJobs();
      case "/approvedjobs":
        return this.getAllApprovedJobs();
      default:
        return this.getMyDraftedJobs();
    }
  };

  handleClickShowJob = currJob => {
    this.setState({
      currJob: currJob,
      currBody: currJob.body,
      currTitle: currJob.title,
      latestClick: "ShowJob"
    });
  };

  handleClickDisapproveBtn = currJob => {
    let id = currJob.id;
    let user_id = this.props.user_id;
    let title = currJob.title;
    let body = currJob.body;
    let status = "draft";
    let URL = BASE_URL + "jobs/" + id;

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        id: id,
        user_id: user_id,
        body: body,
        title: title,
        status: status
      })
    })
      .then(response => response.json())
      .then(data => window.location.reload());
  };

  handleClickApproveBtn = currJob => {
    let id = currJob.id;
    let user_id = currJob.users;
    let title = currJob.title;
    let body = currJob.body;
    let status = "approved";

    let URL = BASE_URL + "jobs/" + id;

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: user_id,
        body: body,
        title: title,
        status: status
      })
    })
      .then(response => response.json())
      .then(data => window.location.reload());
  };
  
  render() {
    return (
      <Fragment>
        <div className="container">
          <AdminJobSidebar
            latestClick={this.state.latestClick}
            filteredJobs={this.getFilteredJobs()}
            currJob={this.state.currJob}
            showJob={this.handleClickShowJob}
          />
          <AdminJobContent
            latestClick={this.state.latestClick}
            currTitle={this.state.currTitle}
            currBody={this.state.currBody}
            currJob={this.state.currJob}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            approveJob={this.handleClickApproveBtn}
            disapproveJob={this.handleClickDisapproveBtn}
            showJob={this.handleClickShowJob}
            saveJob={this.handleClickSaveBtn}
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
  console.log(fetchJobs());
  return {
    fetchJobs: () => {
      dispatch(fetchJobs());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminJobsContainer));
