import React, { Component, Fragment } from "react";
import Search from "../common/Search";
import JobSidebar from "./JobSidebar";
import Content from "./JobContent";
import { withRouter } from "react-router-dom";

const BASE_URL = "http://localhost:3000/";

class JobContainer extends Component {
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
      searchText: "",
      userType: ""
    };
  }

  //Set all jobs and filtered jobs on load of Container 
  componentDidMount() {
    // debugger;
    fetch(BASE_URL + "api/v1/jobs")
      .then(resp => resp.json())
      .then(jobsArray => {
        this.setState({ 'allJobs': jobsArray });
        this.setState({ 'filteredJobs': jobsArray });
        localStorage.setItem('allJobs', JSON.stringify(jobsArray));
        localStorage.setItem('filteredJobs', JSON.stringify(jobsArray));
        
        console.log(jobsArray);
      });
  }

  //Get all jobs of current user/employer based on userId
  getMyJobs = () => {
   
    //Filter all jobs, return jobs belonging to current user 
    let allJobs = [...this.state.allJobs]
    
    let currUser = JSON.parse(localStorage.getItem('currUser'))
    // debugger 
    let myJobs = allJobs.filter( job => 
      job.users[0].id === currUser.id )

return myJobs 
 }

  //Filter all of job based on searchText
  getFilteredJobs = () => {

    //Jobs belonging to current user/employer  
    let myJobs = this.getMyJobs()
    // debugger 

    let newFilteredJobs = myJobs.filter(job => {
      return job.title
        .toLowerCase()
        .includes(this.state.searchText.toLowerCase());
    });
    return newFilteredJobs;
  };

  //----------BEGIN EVENT HANDLERS, CLICKS, SUBMITS

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

  handleClickNewBtn = () => {
    this.setState({ latestClick: "" });
    console.log(this.props.currUser);
    // debugger
    //Create new empty job object --- hard-coded UserID = 2
    let userId = this.props.currUser.id;

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
    //create new job object with newTitle and newBody
    let newJob = { title: newTitle, body: newBody, id: id };
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
            //CRUD event handlers
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

export default withRouter(JobContainer);
