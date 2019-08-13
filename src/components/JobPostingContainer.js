import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
// import Applications from "./Applications";
import Content from "./Content";
import {Route, Link } from "react-router-dom";

const BASE_URL = "http://localhost:3000/";
//Static, only updates on "Component Did Mount" --- Avoids the problem of the new "allJobs" filtering

class JobPostingContainer extends Component {
  constructor() {
    super();
    this.state = {
      allJobs: [],
      filteredJobs: [],
      currJob: {},
      currBody: "",
      currTitle: "",
      latestClick: "",
      searchText: ""
    };
  }

  componentDidMount() {
    fetch(BASE_URL + "api/v1/job_postings")
      .then(resp => resp.json())
      .then(jobsArray => {
        this.setState({ allJobs: jobsArray });
        this.setState({ filteredJobs: jobsArray });
        console.log(jobsArray);
      })
   
  }

  //Login Page --- Username input Password Input
  handleChangeInput = e => {
    let currTitle = e.target.value;
    this.setState({ currTitle: currTitle });
  };

  handleChangeTextArea = e => {
    let currBody = e.target.value;
    this.setState({ currBody: currBody });
  };

  getFilteredJobs = () => {
    let allJobs = [...this.state.allJobs];
    // console.log(allJobs);

    let newFilteredJobs = allJobs.filter(job => {
      return job.title.includes(this.state.searchText);
    });

    return newFilteredJobs;
  };

  handleChangeSearchText = e => {
    //ALL NOTES ARRAY:
    // console.log("ALL NOTES STATE ARRAY", this.state.allJobs)
    this.setState({ searchText: e.target.value }, this.getFilteredJobs);
    // debugger
    //Update "all jobs" to only return filtered jobs based on job Title
  };

  //Refactor the SetState to be only one single object --- with KV pairs
  handleClickShowJob = currJob => {
    this.setState({ currJob: currJob });
    this.setState({ currBody: currJob.body });
    this.setState({ currTitle: currJob.title });
    this.setState({ latestClick: "ShowJob" });
  };

  //Change latestClick and update state of
  handleClickEditBtn = e => {
    console.log(e);
    this.setState({ changesCount: (this.state.changesCount += 1) });
    let startTitle = e.target.parentElement.children[0].innerText;
    let startBody = e.target.parentElement.children[1].innerText;
    //change latestClick to "edit"
    this.setState({ latestClick: "EditJob" });
    this.setState({ currTitle: startTitle });
    this.setState({ currBody: startBody });
  };

  handleClickSaveBtn = currJob => {
    //get current id of current job
    let id = currJob.id;
    let body = currJob.body;

    // let currUserId = currJob.user.id

    //get new current title from editJob view
    let newTitle = this.state.currTitle;
    //get new current body from editJob view
    let newBody = this.state.currBody;

    //create new job object with newTitle and newBody
    let newJob = { title: newTitle, body: newBody, id: id };
    let URL = BASE_URL + "api/v1/job_postings/" + id;
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

  //First hit the debugger
  //Set the CurrJob title and body to "defaults"
  //create a new note from sidebar, NoteList component
  handleClickNewBtn = () => {
    this.setState({ latestClick: "" });

    //Create new empty job object --- hard-coded UserID = 2
    let newJob = { title: "Deafult Title", body: "Deafult Body", user_id: 1 };
    let URL = BASE_URL + "api/v1/job_postings";
    console.log("Is URL Printing", URL);
    // debugger;
    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newJob) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(jobObj => {
        console.log(jobObj);
        this.setState({ allJobs: [...this.state.allJobs, jobObj] }); // parses JSON response into native JavaScript objects
      });
  };

//Discard any changes made and render "Show" of Current Job
  handleClickCancelBtn = () => {
    this.setState({ latestClick: "ShowJob" });
  };

  handleClickDeleteBtn = () => {
    let id = this.state.currJob.id;
    //create new job object with newTitle and newBody
    let URL = BASE_URL + "api/v1/job_postings/" + id;
    let jobPosting = {id: id}
    

    return fetch(URL, {
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",     
      },
      body: JSON.stringify(jobPosting) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(errors => console.log(errors)); // parses JSON response into native JavaScript objects
  };
  

  render() {
    return (
      <Fragment>
      
        <Search
          latestClick={this.state.latestClick}
          handleChangeSearchText={this.handleChangeSearchText}
        />
        <div className="container">
          <Sidebar
            allJobs={this.state.allJobs}
            filteredJobs={this.getFilteredJobs()}
            showJob={this.handleClickShowJob}
            currJob={this.state.currJob}
            newJob={this.handleClickNewBtn}
            latestClick={this.state.latestClick}
          />
          <Content
            currJob={this.state.currJob}
            editJob={this.handleClickEditBtn}
            cancelJob={this.handleClickCancelBtn}
            deleteJob={this.handleClickDeleteBtn}
            newJob={this.handleClickNewBtn}
            handleChangeTextArea={this.handleChangeTextArea}
            handleChangeInput={this.handleChangeInput}
            showJob={this.handleClickShowJob}
            saveJob={this.handleClickSaveBtn}
            currTitle={this.state.currTitle}
            currBody={this.state.currBody}
            latestClick={this.state.latestClick}
          />
        </div>
      </Fragment>
    );
  }
}

// toString()
//         .toLowerCase()
//         .includes(this.state.searchText.toLowerCase());



export default JobPostingContainer;
