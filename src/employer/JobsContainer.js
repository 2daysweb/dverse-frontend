import React, { Component, Fragment } from "react";
import Search from "../common/Search";
import JobSidebar from "./JobSidebar";
import Content from "./JobContent";
import { withRouter } from "react-router-dom";

const BASE_URL = "http://localhost:3000/";

class JobsContainer extends Component {
  constructor() {
    super();
    this.state = {
      allJobs: [],
      filteredJobs: [],
      myJobs: [],
      currJob: null,
      currBody: "",
      currTitle: "",
      latestClick: "",
      searchText: ""
    };
  }

  //Set all jobs and filtered jobs on load of Container
  componentDidMount() {
    // //debugger;
    fetch(BASE_URL + "api/v1/jobs")
      .then(resp => resp.json())
      .then(jobsArray => {
        this.setState({ allJobs: jobsArray });
        this.setState({ filteredJobs: jobsArray });
        localStorage.setItem("allJobs", JSON.stringify(jobsArray));
        localStorage.setItem("filteredJobs", JSON.stringify(jobsArray));

        console.log(jobsArray);
      });
  }

  //Get all approved jobs for all employers
  getAllApprovedJobs = () => {
    let allJobs = [...this.state.allJobs];

    let allApprovedJobs = allJobs.filter(job => job.status === "approved");
    return allApprovedJobs;
  };

  //Get all jobs submitted for approval from all employers
  getAllSubmittedJobs = () => {
    let allJobs = [...this.state.allJobs];

    let allSubmittedJobs = allJobs.filter(job => job.status === "submitted");
    return allSubmittedJobs;
  };

  //Get array of all jobs of current user/employer
  getAllMyJobs = () => {
    //Filter all jobs, return jobs belonging to current user
    let allJobs = [...this.state.allJobs];

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
    //  //debugger
    let draftedJobs = myJobs.filter(job => job.status === "draft");
    // //debugger;
    return draftedJobs;
  };
  getMySubmittedJobs = () => {
    let myJobs = this.getAllMyJobs();
    // //debugger
    let mySubmittedJobs = myJobs.filter(job => job.status === "submitted");

    return mySubmittedJobs;
  };

  //Create a JSON switch config
  //Make a root components and either extend them, or B. Use JSON config file to
  //Filter all of job based on searchText
  getFilteredJobs = () => {
    let currUserType = JSON.parse(localStorage.getItem("currUser")).user_type;
    let status = this.props.status;
    //debugger;
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

  handleClickDisapproveBtn = currJob => {
    //get current id of current job
    //  //debugger
    let id = currJob.id;
    let title = currJob.title;
    let body = currJob.body;
    let status = "draft";
    
    //  create new job object with newTitle and newBody

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

  //Employer clicks submit job, switch from is_draft to is_submitted
  handleClickSubmitBtn = currJob => {
    debugger 
    //get current id of current job
    //  //debugger
    let id = currJob.id;
    let title = currJob.title;
    let body = currJob.body;
    let status = "submitted";

    //  create new job object with newTitle and newBody

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
    //  //debugger
    let id = currJob.id;
    let title = currJob.title;
    let body = currJob.body;
    let status = "active";
    //  //debugger

    //  create new job object with newTitle and newBody

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
    this.setState({ latestClick: "" });
    console.log(this.props.currUser);
    //Create new empty job object --- hard-coded UserID = 2
    let userId = this.props.currUser.id;
    // //debugger;
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
      .then(jobObj => {
        console.log(jobObj);
        this.setState({ allJobs: [...this.state.allJobs, jobObj] });
      });
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
    //get new current title from editJob view
    let newTitle = this.state.currTitle;
    //get new current body from editJob view
    let newBody = this.state.currBody;

    let status = 'draft'

//  debugger  
    let newJob = { title: newTitle, body: newBody, id: id, status:status };
    let URL = BASE_URL + "api/v1/jobs/" + id;
    console.log(URL);

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newJob) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(data => console.log(data)); // parses JSON response into native JavaScript objects
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

    //Remove deleted job from backend
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

  //Delete a job from allJobs on click of Delete Button
  deleteJob = id => {
    //Make copy of existing currJobs array
    let currAllJobs = [...this.state.allJobs];
    let newAllJobs = currAllJobs.filter(job => job.id !== id);
    //update state of allJobs, without deleted job
    this.setState({ allJobs: [...newAllJobs] });
    // this.setState({currUser:this.state})
    console.log(this.state.allJobs);
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
            //CRUD event handlers
            status={this.props.status}
            disapproveJob = {this.handleClickDisapproveBtn}
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

export default withRouter(JobsContainer);

//      Logic for handling search filter
//     let newFilteredJobs = approvedJobs.filter(job => {
//       return job.title.toLowerCase().includes(this.state.searchText.toLowerCase())
//     })
//     return newFilteredJobs
//   }
