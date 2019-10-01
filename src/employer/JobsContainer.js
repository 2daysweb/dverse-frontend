import React, { Component, Fragment } from "react";
import JobSidebar from "./JobSidebar";
import Content from "./JobContent";
import { connect } from "react-redux";
import { fetchJobs } from "../actions/index.js";
import { withRouter } from "react-router-dom";

const BASE_URL = "http://localhost:3000/";

class JobsContainer extends Component {
  constructor() {
    super()
    this.state = {
      currJob: null,
      currBody: "",
      currTitle: "",
      latestClick: "",
      searchText: ""
    };
  }

  componentDidMount() {
    this.props.fetchJobs();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.jobs, this.props.jobs);
    if (prevProps.jobs.length) {
      if (prevProps.jobs.slice(-1)[0].id !== this.props.jobs.slice(-1)[0].id) {
        this.props.fetchJobs();
      }
    }
  }

  getAllMyJobs = () => {
    //Get jobs belonging to current user
    let allJobs = this.props.jobs;
    let user = this.props.user;
    console.log("IN GET ALL MY JOBS", user);
    debugger;
    let myJobs = allJobs.filter(job => job.users[0].id === user.id);
    return myJobs;
  };

  //Get all user's jobs
  getMyApprovedJobs = () => {
    let myJobs = this.getAllMyJobs();
    let myApprovedJobs = myJobs.filter(job => job.status === "approved");
    return myApprovedJobs;
  };

  getMyDraftedJobs = () => {
    let myJobs = this.getAllMyJobs();
    let draftedJobs = myJobs.filter(job => job.status === "draft");
    return draftedJobs;
  };
  getMySubmittedJobs = () => {
    let myJobs = this.getAllMyJobs();
    let mySubmittedJobs = myJobs.filter(job => job.status === "submitted");
    return mySubmittedJobs;
  };
  getFilteredJobs = () => {
    let userType = this.props.user.user_type;
    let status = this.props.status;

    switch (status) {
      case "approved":
        if (userType === "employer") {
          return this.getMyApprovedJobs();
        } else {
          return this.getAllApprovedJobs();
        }

      case "submitted":
        if (userType === "employer") {
          return this.getMySubmittedJobs();
        } else {
          return this.getAllSubmittedJobs();
        }

      case "draft":
        return this.getMyDraftedJobs();
      default:
        return this.getAllMyJobs();
    }
  };

  //------------------------------------BEGIN EVENT HANDLERS------------------------------------------//

  handleChangeSearchText = e => {
    this.setState({ searchText: e.target.value }, this.getFilteredJobs);
  };

  handleClickShowJob = currJob => {
    this.setState({
      currJob: currJob,
      currBody: currJob.body,
      currTitle: currJob.title,
      latestClick: "ShowJob"
    });
  };

  updateJobObj = job => {
    let id = job.id;
    let title = job.title;
    let body = job.body;
    let status = job.status;
    let newJob = { id: id, title: title, body: body, status: status };
    return newJob;
  };

  handleClickSubmitBtn = currJob => {
    let id = currJob.id;
    let URL = BASE_URL + "api/v1/jobs/" + id;
    let submittedJob = this.updateJobObj(currJob);
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
      .then(data => console.log(data));
  };

  handleClickWithdrawSubmitBtn = currJob => {
    let withdrawnJob = this.updateJobObj(currJob);
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
      .then(data => console.log(data));
  };

  handleClickActivateBtn = currJob => {
    let activatedJob = this.updateJobObj(currJob);
    let id = currJob.id;
    let URL = BASE_URL + "api/v1/jobs/" + id;

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(activatedJob)
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  handleClickNewBtn = () => {
    this.setState({ latestClick: "" });
    let user = this.props.user.user_type;
    let userId = user.id;

    let newJob = {
      title: "Deafult Title",
      body: "Deafult Body",
      user_id: userId
    };
    let URL = BASE_URL + "api/v1/jobs";
    console.log("Is URL Printing", URL);

    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newJob)
    })
      .then(response => response.json())
      .then(newJob => console.log(newJob));
  };

  handleClickEditBtn = e => {
    this.setState({ latestClick: "EditJob" });
  };

  handleChangeTextArea = editedBody => {
    let newBody = editedBody;
    this.setState({ currBody: newBody });
  };

  handleChangeInput = editedTitle => {
    this.setState({ currTitle: editedTitle });
  };

  handleClickSaveBtn = currJob => {
    let id = currJob.id;
    //get title from editor
    let newTitle = this.state.currTitle;
    //get body from editor
    let newBody = this.state.currBody;
    let status = "draft";
    let newJob = { title: newTitle, body: newBody, id: id, status: status };
    let URL = BASE_URL + "api/v1/jobs/" + id;

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newJob)
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  //Discard any changes made in editor
  handleClickCancelBtn = () => {
    this.setState({ latestClick: "ShowJob" });
  };

  handleClickDeleteBtn = () => {
    let id = this.state.currJob.id;
    let URL = BASE_URL + "api/v1/jobs/" + id;
    let job = { id: id };
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

  deleteJob = id => {
    console.log(this.props.jobs);
  };

  //--------------------END-----------------------------------Event Handlers -------------------------------------------------END-------------------------------//

  render() {
    return (
      <Fragment>
        <div className="container">
          <JobSidebar
            latestClick={this.state.latestClick}
            currJob={this.state.currJob}
            //event handlers
            showJob={this.handleClickShowJob}
            newJob={this.handleClickNewBtn}
          />
          <Content
            latestClick={this.state.latestClick}
            currTitle={this.state.currTitle}
            currBody={this.state.currBody}
            currJob={this.state.currJob}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            submitJob={this.handleClickSubmitBtn}
            withdrawSubmitJob={this.handleClickWithdrawSubmitBtn}
            //event handlers
            status={this.props.status}
            activateJob={this.handleClickActivateBtn}
            editJob={this.handleClickEditBtn}
            showJob={this.handleClickShowJob}
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
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchJobs: () => {
      dispatch(fetchJobs())
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JobsContainer))
