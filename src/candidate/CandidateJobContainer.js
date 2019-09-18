import React, { Component, Fragment } from "react";
import Search from "../common/Search";
import CandidateJobContent from "./CandidateJobContent";
import CandidateJobSidebar from "./CandidateJobSidebar";
import { connect } from "react-redux";
import { fetchJobs } from "../actions/index";
import { withRouter } from "react-router-dom";

const BASE_URL = "http://localhost:3000/";

class CandidateJobContainer extends Component {
  constructor() {
    super();
    this.state = {
      filteredJobs: [],
      currJob: null,
      currBody: "",
      currTitle: "",
      allCandidates: [],
      filteredCandidates: [],
      currCandidate: null,
      currFirstName: "",
      currLastName: "",
      latestClick: "",
      searchText: "",
      userType: ""
    };
  }

  //Set all jobs and filtered jobs on load of Main Container
  componentDidMount() {
    this.props.fetchJobs();
  }

  //TODO: Fix re-rendering problem --- prevProps.jobs sometimes undefined --- infinite loop of server calls
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.jobs.slice(-1)[0] !== undefined) {
      if (prevProps.jobs.slice(-1)[0].id !== this.props.jobs.slice(-1)[0].id) {
        this.props.fetchJobs();
      }
    }
  }

  createJobObj = job => {
    let id = job.id;
    let title = job.title;
    let body = job.body;
    let status = job.status;
    let newJob = { id: id, title: title, body: body, status: status };
    return newJob;
  };

  handleClickApplyBtn = currJob => {
    let id = currJob.id;
    let userId = JSON.parse(localStorage.getItem("currUser")).id;
    let URL = BASE_URL + "api/v1/jobs/" + id;
    let appliedJob = this.createJobObj(currJob);
    // appliedJob.applied = 
    appliedJob.user_id = userId;

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(appliedJob)
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  handleClickFollowBtn = currJob => {
    //get current id of current job
    let id = currJob.id;

    //get clicked job body
    let body = currJob.body;
    let title = currJob.title;
    let status = "following";

    let followedJob = { title: title, body: body, id: id, status: "following" };
    let URL = BASE_URL + "api/v1/jobs/" + id;

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(followedJob)
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  handleChangeSearchText = e => {
    this.setState({ searchText: e.target.value }, this.getFilteredJobs);
  };

  handleClickShowJob = currJob => {
    this.setState({ currJob: currJob });
    this.setState({ currBody: currJob.body });
    this.setState({ currTitle: currJob.title });
    this.setState({ latestClick: "ShowJob" });
  };

  //---------------BEGIN-----Event Handlers for Editing, Saving  Job-------------------------------//

  //--------------------END-----Event Handlers for Editing, Saving  Job-------------------------------//

  handleClickDeleteBtn = () => {
    let id = this.state.currJob.id;
    let URL = BASE_URL + "api/v1/jobs/" + id;
    let job = { id: id };

    //Remove deleted job
    return fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(job)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .then(this.deleteJob(id));
  };

  render() {
    return (
      <Fragment>
        <Search
          latestClick={this.state.latestClick}
          handleChangeSearchText={this.handleChangeSearchText}
          currUser={this.props.currUser}
        />
        <div className="container">
          <CandidateJobSidebar
            //State variables
            latestClick={this.state.latestClick}
            allJobs={this.props.jobs}
            currJob={this.state.currJob}
            applyJob={this.handleClickApplyBtn}
            //CRUD event handlers
            showJob={this.handleClickShowJob}
            followJob={this.handleClickFollowBtn}
          />
          <CandidateJobContent
            //State variables
            latestClick={this.state.latestClick}
            currTitle={this.state.currTitle}
            currBody={this.state.currBody}
            currJob={this.state.currJob}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            applyJob={this.handleClickApplyBtn}
            //CRUD event handlers
            editJob={this.handleClickEditBtn}
            showJob={this.handleClickShowJob}
            followJob={this.handleClickFollowBtn}
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
    jobs: state.jobs.jobs
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
)(withRouter(CandidateJobContainer));
