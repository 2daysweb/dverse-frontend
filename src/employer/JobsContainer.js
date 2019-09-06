import React, { Component, Fragment } from "react";
import Search from "../common/Search";
import JobSidebar from "./JobSidebar";
import Content from "./JobContent";
import { store } from "../store";
import { connect } from "react-redux";
import { fetchJobs } from "../actions/index";
import { withRouter } from "react-router-dom";

const BASE_URL = "http://localhost:3000/";

class JobsContainer extends Component {
  constructor() {
    super();
    this.state = {
      filteredJobs: [],
      myJobs: [],
      currJob: null,
      currBody: "",
      currTitle: "",
      latestClick: "",
      searchText: ""
    };
  }

//Set jobs from redux state on mount

  componentDidMount() {
    this.props.fetchJobs();
  }

  //Get array of all jobs of current user/employer
  getAllMyJobs = () => {
  //Filter all jobs, return jobs belonging to current user
    let allJobs = this.props.jobs;
    let currUser = JSON.parse(localStorage.getItem("currUser"));
  //Filter through all jobs for jobs where user id matches curr user id
    let myJobs = allJobs.filter(job => job.users[0].id === currUser.id);
    return myJobs;
  };

  //Get all jobs of current user/employer based on userId
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

  //Create a JSON switch config
  // TODO: Make a HOC and extend them, or B use JSON config file to

  //Filter all of job based on searchText
  getFilteredJobs = () => {
    let currUserType = JSON.parse(localStorage.getItem("currUser")).user_type;
    let status = this.props.status;

    //;
    switch (status) {
      case "approved":
        if (currUserType === "employer") {
          return this.getMyApprovedJobs();
        } else {
          return this.getAllApprovedJobs();
        }

      case "submitted":
        if (currUserType === "employer") {
          return this.getMySubmittedJobs();
        } else {
          return this.getAllSubmittedJobs();
        }

      case "draft":
        return this.getMyDraftedJobs();
      default:
        return false;
    }
  };

  //----------BEGIN EVENT HANDLERS, CLICKS, SUBMITS--------------------//

  handleChangeSearchText = e => {
    this.setState({ searchText: e.target.value }, this.getFilteredJobs);
  };

  //Refactor the SetState to be only one single object --- with KV pairs

  handleClickShowJob = currJob => {
    this.setState({ currJob: currJob });
    this.setState({ currBody: currJob.body });
    this.setState({ currTitle: currJob.title });
    this.setState({ latestClick: "ShowJob" });
  };

  //Employer clicks submit job, switch from is_draft to is_submitted

  handleClickSubmitBtn = currJob => {
    //get current id of current job
    //  //
    let id = currJob.id;
    let title = currJob.title;
    let body = currJob.body;
    let status = "submitted";

    //Create new job object with newTitle and newBody

    let URL = BASE_URL + "api/v1/jobs/" + id;

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ body: body, title: title, status: status })
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  handleClickWithdrawSubmitBtn = currJob => {
    //get current id of current job
    //
    let id = currJob.id;
    let title = currJob.title;
    let body = currJob.body;
    let status = "draft";

    //create new job object with newTitle and newBody

    let URL = BASE_URL + "api/v1/jobs/" + id;

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ body: body, title: title, status: status })
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  handleClickActivateBtn = currJob => {
    //get current id of current job
    
    let id = currJob.id;
    let title = currJob.title;
    let body = currJob.body;
    let status = "active";

    let URL = BASE_URL + "api/v1/jobs/" + id;

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ body: body, title: title, status: status })
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  handleClickNewBtn = () => {
    debugger;
    this.setState({ latestClick: "" });
    let currUser = JSON.parse(localStorage.getItem("currUser"));
    let userId = currUser.id;
    // //;
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

  //---------------BEGIN-----Event Handlers for Editing, Saving  Job-------------------------------//

  handleClickEditBtn = e => {
    //update latestClick to "edit"
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
    //get current id of current job
    let id = currJob.id;
    //get new current title from JobEditor
    let newTitle = this.state.currTitle;
    //get new current body from JobEditor
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

  //--------------------END-----Event Handlers for Editing, Saving  Job-------------------------------//

  //--------------------BEGIN-----Event Handlers for Cancel, Delete Buttons-------------------------------//

  //Discard any changes made and render "Show" of Current Job
  handleClickCancelBtn = () => {
    this.setState({ latestClick: "ShowJob" });
  };

  handleClickDeleteBtn = () => {
    let id = this.state.currJob.id;
    //create new job object with newTitle and newBody
    let URL = BASE_URL + "api/v1/jobs/" + id;
    let job = { id: id };

    //Remove deleted job from
    return fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(job) // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses JSON response into native JavaScript objects
      .then(data => console.log(data))
      .then(this.deleteJob(id));
  };

  //Delete a job from allJobs on click of Delete Button
  deleteJob = id => {
    //Make copy of existing currJobs array
    //update state of allJobs, without deleted job
   
    // this.setState({currUser:this.state})
    console.log(this.props.jobs);
  };
  //--------------------END-----Event Handlers for Cancel, Delete Buttons-------------------------------//

  render() {
    return (
      <Fragment>
        <Search
          latestClick={this.state.latestClick}
          handleChangeSearchText={this.handleChangeSearchText}
          currUser={this.props.currUser}
        />
        <div className="container">
          <JobSidebar
            //State variables
            latestClick={this.state.latestClick}
            filteredJobs={this.getFilteredJobs()}
            currJob={this.state.currJob}
            //CRUD event handlers
            showJob={this.handleClickShowJob}
            newJob={this.handleClickNewBtn}
            currUser={this.props.currUser}
          />
          <Content
            //State variables
            latestClick={this.state.latestClick}
            currTitle={this.state.currTitle}
            currBody={this.state.currBody}
            currJob={this.state.currJob}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            submitJob={this.handleClickSubmitBtn}
            withdrawSubmitJob={this.handleClickWithdrawSubmitBtn}
            //CRUD event handlers
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
)(withRouter(JobsContainer));
