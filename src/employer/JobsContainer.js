import React, { Component, Fragment } from "react";
import JobSidebar from "./JobSidebar";
import Content from "./JobContent";
import { connect } from "react-redux";
import { fetchJobs } from "../actions/index.js";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

class JobsContainer extends Component {
  constructor() {
    super();
    this.state = {
      currJob: null,
      currBody: "",
      currTitle: "",
      latestClick: "",
      searchText: ""
    };
  }

  componentDidMount = () => {
    this.props.fetchJobs();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.jobs.length) {
      if (prevProps.jobs.slice(-1)[0].id !== this.props.jobs.slice(-1)[0].id) {
        this.props.fetchJobs();
      }
    }
  }
  //Get jobs belonging to current user
  getAllMyJobs = () => {
    debugger
    let allJobs = this.props.jobs;
    let user = this.props.user
    console.log("USER: ", user, "------", "ALL JOBS: ", this.props.jobs)
    let myJobs = allJobs.filter(job => {if(job.users[0] && job.users[0].id === user.id)
      return job
      
    });
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
    let pathname = this.props.history.location.pathname;

    switch (pathname) {
      case "/mypendingjobs":
        return this.getMySubmittedJobs();
      case "/employjobs":
        return this.getAllMyJobs();
      case "/mydraftjobs":
        return this.getMyDraftedJobs();
      default:
        return this.getMyDraftedJobs();
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
    let user_id = this.props.user.id
    let id = job.id;
    let title = job.title;
    let body = job.body;
    let status = job.status;
    let newJob = { id: id, title: title, body: body, status: status, user_id:user_id };
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
    withdrawnJob.status = "draft"
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
    let user = this.props.user
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
    let user_id = this.props.user.id
    //get title from editor
    let title = this.state.currTitle;
    //get body from editor
    let body = this.state.currBody;
    let status = "draft";
    let job = { title: title, body: body, id: id, status: status, user_id:user_id };
   
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
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(job)
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  //--------------------END-----------------------------------Event Handlers -------------------------------------------------END-------------------------------//

  render() {
    return (
      <Fragment>
        <div className="container">
          <JobSidebar
            latestClick={this.state.latestClick}
            currJob={this.state.currJob}
            showJob={this.handleClickShowJob}
            newJob={this.handleClickNewBtn}
            filteredJobs={this.getFilteredJobs}
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
