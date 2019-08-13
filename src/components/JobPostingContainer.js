import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

const BASE_URL = "http://localhost:3000/";

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
      });
  }

  getFilteredJobs = () => {
    let allJobs = [...this.state.allJobs];
    // console.log(allJobs);

    // toString()
    //         .toLowerCase()
    //         .includes(this.state.searchText.toLowerCase());

    let newFilteredJobs = allJobs.filter(job => {
      return job.title.includes(this.state.searchText);
    });

    return newFilteredJobs;
  };

  handleChangeSearchText = e => {
    this.setState({ searchText: e.target.value }, this.getFilteredJobs);
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
    let jobPosting = { id: id };

    //Remove deleted job from

    return fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jobPosting) // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses JSON response into native JavaScript objects
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
    console.log(this.state.allJobs);
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



export default JobPostingContainer;
