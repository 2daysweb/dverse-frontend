import React, { Component, Fragment } from "react"
import NavBar from "./Nav"
import Search from "./Search"
import EnhancedSearch from './EnhancedSearch'
import CandidateContent from "./CandidateContent"
import CandidateSidebar from "./CandidateSidebar"
import {withRouter} from 'react-router-dom'

const BASE_URL = "http://localhost:3000/"

class CandidateContainer extends Component {
  constructor() {
    super()
    this.state = {
      currCandidate: {},
      allCandidates: [],
      filteredCandidates: [],
      currCandidate: {},
      currFirstName: "",
      currLastName: "",
      currResume:"",
      currAvatar:"",
      currSkills:[],
      currAvatar: "",
      latestClick: "",
      searchText: "",
      userType: ""
    }
  }

  //Set all candidates and filtered candidates on load of Main Container
  componentDidMount() {
    fetch(BASE_URL + "api/v1/users")
      .then(resp => resp.json())
      .then(candidatesArray => {
        this.setState({ allCandidates: candidatesArray })
        this.setState({ filteredCandidates: candidatesArray })
        console.log(this.state.filteredCandidates)
        
      })
  }

  //Filter all candidates based on searchText
  getFilteredCandidates = () => {
    let allCandidates = [...this.state.allCandidates]
    
    let newFilteredCandidates = allCandidates.filter(candidate => {
      return candidate.first_name.toLowerCase().includes(this.state.searchText.toLowerCase())
    })
    return newFilteredCandidates
  }

  //----------BEGIN EVENT HANDLERS, CLICKS, SUBMITS,

  handleChangeSearchText = e => {
    this.setState({ searchText: e.target.value }, this.getFilteredCandidates)
  }

  //Refactor the SetState to be only one single object --- with KV pairs

  handleClickShowCandidate = currCandidate => {
    this.setState({ currCandidate: currCandidate })
    this.setState({ currFirstName: currCandidate.first_name })
    this.setState({ currLastName: currCandidate.last_name })
    this.setState({ latestClick: "ShowCandidate" })
  }

  handleClickNewBtn = () => {
    this.setState({ latestClick: "" })

    //Create new empty candidate object --- hard-coded UserID = 2
    let newCandidate = { first_name: "Deafult Title", body: "Deafult Body", user_id: 1 }
    let URL = BASE_URL + "api/v1/candidates"
    console.log("Is URL Printing", URL)

    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newCandidate) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(candidateObj => {
        console.log(candidateObj)
        this.setState({ allCandidates: [...this.state.allCandidates, candidateObj] }) // parses JSON response into native JavaScript objects
      })
      
  }

  //---------------BEGIN-----Event Handlers for Editing, Saving  Candidate-------------------------------//

  handleClickEditBtn = e => {
    //update latestClick to "edit"
    this.setState({ latestClick: "EditCandidate" })
  }

  handleChangeTextArea = editedBody => {
    let newBody = editedBody
    this.setState({ currBody: newBody })
  }

  handleChangeInput = editedTitle => {
    this.setState({ currTitle: editedTitle })
  }

  handleClickSaveBtn = currCandidate => {

    //get current id of current candidate
    let id = currCandidate.id
    //get new current first_name from editCandidate view
    let newTitle = this.state.currTitle
    //get new current body from editCandidate view
    let newBody = this.state.currBody
    //create new candidate object with newTitle and newBody
    let newCandidate = { first_name: newTitle, body: newBody, id: id }
    let URL = BASE_URL + "api/v1/users/" + id
    console.log(URL)

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newCandidate) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(data => console.log(data)) // parses JSON response into native JavaScript objects
  }

  //--------------------END-----Event Handlers for Editing, Saving  Candidate-------------------------------//

  //Discard any changes made and render "Show" of Current Candidate
  handleClickCancelBtn = () => {
    this.setState({ latestClick: "ShowCandidate" })
  }

  handleClickDeleteBtn = () => {
    let id = this.state.currCandidate.id
    //create new candidate object with newTitle and newBody
    let URL = BASE_URL + "api/v1/users/" + id
    let candidate = { id: id }

    //Remove deleted candidate from
    return fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(candidate) // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses JSON response into native JavaScript objects
      .then(data => console.log(data))
      .then(this.deleteCandidate(id))
  }

  //Delete a candidate from allCandidates on click of Delete Button
  deleteCandidate = id => {
    //Make copy of existing currCandidates array
    let currAllCandidates = [...this.state.allCandidates]
    let newAllCandidates = currAllCandidates.filter(candidate => candidate.id !== id)
    //update state of allCandidates, without deleted candidate
    this.setState({ allCandidates: [...newAllCandidates] })
    // this.setState({currUser:this.state})
    console.log(this.state.allCandidates)
  }

  render() {
    return(
    <Fragment>
            <EnhancedSearch
              latestClick={this.state.latestClick}
              handleChangeSearchText={this.handleChangeSearchText}
              currUser={this.props.currUser}
            />
            <div className="container">
              <CandidateSidebar
                //State variables
                latestClick={this.state.latestClick}
                allCandidates={this.state.allCandidates}
                filteredCandidates={this.getFilteredCandidates()}
                currCandidate={this.state.currCandidate}
                //CRUD event handlers
                showCandidate={this.handleClickShowCandidate}
                newCandidate={this.handleClickNewBtn}
                currUser={this.props.currUser}
              />
              <CandidateContent
                //State variables
                latestClick={this.state.latestClick}
                currTitle={this.state.currTitle}
                currBody={this.state.currBody}
                currCandidate={this.state.currCandidate}
                handleChangeInput={this.handleChangeInput}
                handleChangeTextArea={this.handleChangeTextArea}
                //CRUD event handlers
                editCandidate={this.handleClickEditBtn}
                showCandidate={this.handleClickShowCandidate}
                saveCandidate={this.handleClickSaveBtn}
                cancelCandidate={this.handleClickCancelBtn}
                deleteCandidate={this.handleClickDeleteBtn}
                newCandidate={this.handleClickNewBtn}
              />
            </div>
          </Fragment>
        )
  }
}

export default withRouter(CandidateContainer)
