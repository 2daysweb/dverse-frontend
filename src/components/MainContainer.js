import React, { Component, Fragment } from "react"
import NavBar from "./Nav"
import Search from "./Search"
import Sidebar from "./Sidebar"
import CandidateSidebar from "./CandidateSidebar"
import AdminSidebar from "./AdminSidebar"
import {withRouter} from 'react-router-dom'

const BASE_URL = "http://localhost:3000/"

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {
      allJobs: [],
      filteredJobs: [],
      currJob: {},
      currBody: "",
      currTitle: "",
      allCandidates: [],
      filteredCandidates: [],
      currCandidate: {},
      currFirstName: "",
      currLastName: "",
      currHomeAddress:"",
      currZip:"",
      currResume:"",
      currAvatar:"",
      currSkills:[],
      currAvatar: "",
      latestClick: "",
      searchText: "",
      userType: ""
    }
  }

  //Set all jobs and filtered jobs on load of Main Container
  componentDidMount() {
    fetch(BASE_URL + "api/v1/jobs")
      .then(resp => resp.json())
      .then(jobsArray => {
        this.setState({ allJobs: jobsArray })
        this.setState({ filteredJobs: jobsArray })
        console.log(jobsArray)
      })
  }

  //Filter all jobs based on searchText
  getFilteredJobs = () => {
    let allJobs = [...this.state.allJobs]

    let newFilteredJobs = allJobs.filter(job => {
      return job.title
        .toLowerCase()
        .includes(this.state.searchText.toLowerCase())
    })
    return newFilteredJobs
  }

  //----------BEGIN EVENT HANDLERS, CLICKS, SUBMITS,

  handleChangeSearchText = e => {
    this.setState({ searchText: e.target.value }, this.getFilteredJobs)
  }

  //Refactor the SetState to be only one single object --- with KV pairs

  handleClickShowJob = currJob => {
    this.setState({ currJob: currJob })
    this.setState({ currBody: currJob.body })
    this.setState({ currTitle: currJob.title })
    this.setState({ latestClick: "ShowJob" })
  }

  handleClickNewBtn = () => {
    this.setState({ latestClick: "" })

    //Create new empty job object --- hard-coded UserID = 2
    let newJob = { title: "Deafult Title", body: "Deafult Body", user_id: 1 }
    let URL = BASE_URL + "api/v1/jobs"
    console.log("Is URL Printing", URL)

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
        console.log(jobObj)
        this.setState({ allJobs: [...this.state.allJobs, jobObj] }) // parses JSON response into native JavaScript objects
      })
  }

  //---------------BEGIN-----Event Handlers for Editing, Saving  Job-------------------------------//

  handleClickEditBtn = e => {
    //update latestClick to "edit"
    this.setState({ latestClick: "EditJob" })
  }

  handleChangeTextArea = editedBody => {
    let newBody = editedBody
    this.setState({ currBody: newBody })
  }

  handleChangeInput = editedTitle => {
    this.setState({ currTitle: editedTitle })
  }

  handleClickSaveBtn = currJob => {
    debugger 
    //get current id of current job
    let id = currJob.id
    //get new current title from editJob view
    let newTitle = this.state.currTitle
    //get new current body from editJob view
    let newBody = this.state.currBody
    //create new job object with newTitle and newBody
    let newJob = { title: newTitle, body: newBody, id: id }
    let URL = BASE_URL + "api/v1/jobs/" + id
    console.log(URL)

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newJob) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(data => console.log(data)) // parses JSON response into native JavaScript objects
  }

  //--------------------END-----Event Handlers for Editing, Saving  Job-------------------------------//

  //Discard any changes made and render "Show" of Current Job
  handleClickCancelBtn = () => {
    this.setState({ latestClick: "ShowJob" })
  }

  handleClickDeleteBtn = () => {
    let id = this.state.currJob.id
    //create new job object with newTitle and newBody
    let URL = BASE_URL + "api/v1/jobs/" + id
    let job = { id: id }

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
      .then(this.deleteJob(id))
  }

  //Delete a job from allJobs on click of Delete Button
  deleteJob = id => {
    //Make copy of existing currJobs array
    let currAllJobs = [...this.state.allJobs]
    let newAllJobs = currAllJobs.filter(job => job.id !== id)
    //update state of allJobs, without deleted job
    this.setState({ allJobs: [...newAllJobs] })
    // this.setState({currUser:this.state})
    console.log(this.state.allJobs)
  }

  //Consider compoletely removing the "CandidateMainContainer etc etcs if this works out"

  renderMainContainer = () => {
    let userType = this.props.currUser.user_type 
    switch (userType) {
      case "employer":
        return (
          <Fragment>
            <Search
              latestClick={this.state.latestClick}
              handleChangeSearchText={this.handleChangeSearchText}
              currUser={this.props.currUser}
            />
            <div className="container">
              <Sidebar
                //State variables
                latestClick={this.state.latestClick}
                allJobs={this.state.allJobs}
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
        )

      case "candidate":
        return (
          <Fragment>
            <Search
              latestClick={this.state.latestClick}
              handleChangeSearchText={this.handleChangeSearchText}
              currUser={this.props.currUser}
            />
            <div className="container">
              <Sidebar
                //State variables
                latestClick={this.state.latestClick}
                allJobs={this.state.allJobs}
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
        )

      case "admin":
        return (
          <Fragment>
            <Search
              latestClick={this.state.latestClick}
              handleChangeSearchText={this.handleChangeSearchText}
              currUser={this.props.currUser}
            />
            <div className="container">
              <Sidebar
                //State variables
                latestClick={this.state.latestClick}
                allJobs={this.state.allJobs}
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
        )

      default:
        return false
    }
  }

  render() {
    return (this.renderMainContainer())
  }
}

export default withRouter(MainContainer)
