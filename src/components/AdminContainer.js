import React, { Component, Fragment } from "react"
import NavBar from "./Nav"
import Search from "./Search"
import AdminContent from "./AdminContent"
import AdminSidebar from "./AdminSidebar"
import {withRouter} from 'react-router-dom'

const BASE_URL = "http://localhost:3000/"

class AdminContainer extends Component {
  constructor() {
    super()
    this.state = {
      currAdmin: {},
      allAdmins: [],
      filteredAdmins: [],
      currAdmin: {},
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

  //Set all Admins and filtered Admins on load of Main Container
  componentDidMount() {
    fetch(BASE_URL + "api/v1/users")
      .then(resp => resp.json())
      .then(AdminsArray => {
        this.setState({ allAdmins: AdminsArray })
        this.setState({ filteredAdmins: AdminsArray })
        console.log(this.state.filteredAdmins)
        
      })
  }

  //Filter all Admins based on searchText
  getFilteredAdmins = () => {
    let allAdmins = [...this.state.allAdmins]
    
    let newFilteredAdmins = allAdmins.filter(Admin => {
      return Admin.first_name.toLowerCase().includes(this.state.searchText.toLowerCase())
    })
    return newFilteredAdmins
  }

  //----------BEGIN EVENT HANDLERS, CLICKS, SUBMITS,

  handleChangeSearchText = e => {
    this.setState({ searchText: e.target.value }, this.getFilteredAdmins)
  }

  //Refactor the SetState to be only one single object --- with KV pairs

  handleClickShowAdmin = currAdmin => {
    this.setState({ currAdmin: currAdmin })
    this.setState({ currFirstName: currAdmin.first_name })
    this.setState({ currLastName: currAdmin.last_name })
    this.setState({ latestClick: "ShowAdmin" })
  }

  handleClickNewBtn = () => {
    this.setState({ latestClick: "" })

    //Create new empty Admin object --- hard-coded UserID = 2
    let newAdmin = { first_name: "Deafult Title", body: "Deafult Body", user_id: 1 }
    let URL = BASE_URL + "api/v1/Admins"
    console.log("Is URL Printing", URL)

    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newAdmin) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(AdminObj => {
        console.log(AdminObj)
        this.setState({ allAdmins: [...this.state.allAdmins, AdminObj] }) // parses JSON response into native JavaScript objects
      })
      
  }

  //---------------BEGIN-----Event Handlers for Editing, Saving  Admin-------------------------------//

  handleClickEditBtn = e => {
    //update latestClick to "edit"
    this.setState({ latestClick: "EditAdmin" })
  }

  handleChangeTextArea = editedBody => {
    let newBody = editedBody
    this.setState({ currBody: newBody })
  }

  handleChangeInput = editedTitle => {
    this.setState({ currTitle: editedTitle })
  }

  handleClickSaveBtn = currAdmin => {

    //get current id of current Admin
    let id = currAdmin.id
    //get new current first_name from editAdmin view
    let newTitle = this.state.currTitle
    //get new current body from editAdmin view
    let newBody = this.state.currBody
    //create new Admin object with newTitle and newBody
    let newAdmin = { first_name: newTitle, body: newBody, id: id }
    let URL = BASE_URL + "api/v1/users/" + id
    console.log(URL)

    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newAdmin) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(data => console.log(data)) // parses JSON response into native JavaScript objects
  }

  //--------------------END-----Event Handlers for Editing, Saving  Admin-------------------------------//

  //Discard any changes made and render "Show" of Current Admin
  handleClickCancelBtn = () => {
    this.setState({ latestClick: "ShowAdmin" })
  }

  handleClickDeleteBtn = () => {
    let id = this.state.currAdmin.id
    //create new Admin object with newTitle and newBody
    let URL = BASE_URL + "api/v1/users/" + id
    let Admin = { id: id }

    //Remove deleted Admin from
    return fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Admin) // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses JSON response into native JavaScript objects
      .then(data => console.log(data))
      .then(this.deleteAdmin(id))
  }

  //Delete a Admin from allAdmins on click of Delete Button
  deleteAdmin = id => {
    //Make copy of existing currAdmins array
    let currAllAdmins = [...this.state.allAdmins]
    let newAllAdmins = currAllAdmins.filter(Admin => Admin.id !== id)
    //update state of allAdmins, without deleted Admin
    this.setState({ allAdmins: [...newAllAdmins] })
    // this.setState({currUser:this.state})
    console.log(this.state.allAdmins)
  }

  render() {
    return(
    <Fragment>
            <Search
              latestClick={this.state.latestClick}
              handleChangeSearchText={this.handleChangeSearchText}
              currUser={this.props.currUser}
            />
            <div className="container">
              <AdminSidebar
                //State variables
                latestClick={this.state.latestClick}
                allAdmins={this.state.allAdmins}
                filteredAdmins={this.getFilteredAdmins()}
                currAdmin={this.state.currAdmin}
                //CRUD event handlers
                showAdmin={this.handleClickShowAdmin}
                newAdmin={this.handleClickNewBtn}
                currUser={this.props.currUser}
              />
              <AdminContent
                //State variables
                latestClick={this.state.latestClick}
                currTitle={this.state.currTitle}
                currBody={this.state.currBody}
                currAdmin={this.state.currAdmin}
                handleChangeInput={this.handleChangeInput}
                handleChangeTextArea={this.handleChangeTextArea}
                //CRUD event handlers
                editAdmin={this.handleClickEditBtn}
                showAdmin={this.handleClickShowAdmin}
                saveAdmin={this.handleClickSaveBtn}
                cancelAdmin={this.handleClickCancelBtn}
                deleteAdmin={this.handleClickDeleteBtn}
                newAdmin={this.handleClickNewBtn}
              />
            </div>
          </Fragment>
        )
  }
}

export default withRouter(AdminContainer)
