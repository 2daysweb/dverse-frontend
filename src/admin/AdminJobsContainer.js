import React, { Component, Fragment } from "react";
import Search from "../common/Search";
import AdminJobSidebar from "./AdminJobSidebar";
import AdminJobContent from "./AdminJobContent";
import { connect } from "react-redux";
import { fetchJobs } from "../actions/index";
import { withRouter } from "react-router-dom";

const BASE_URL = "http://localhost:3000/";

class AdminJobsContainer extends Component {
  constructor() {
    super()
    this.state = {
      filteredJobs: [],
      myJobs: [],
      currJob: null,
      currBody: "",
      currTitle: "",
      latestClick: "",
      searchText: ""
    }
  }

  //get jobs from redux state 
  componentDidMount() {
    this.props.fetchJobs();
  }


  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.jobs !== prevProps.jobs) {
      this.props.fetchJobs();
    }
  }

  handleClickShowJob = currJob => {
    this.setState({ currJob: currJob });
    this.setState({ currBody: currJob.body });
    this.setState({ currTitle: currJob.title });
    this.setState({ latestClick: "ShowJob" });
  };


  //Get all approved jobs for all employers
  getAllApprovedJobs = () => {
    let allJobs =  this.props.jobs

    let allApprovedJobs = allJobs.filter(job => job.status === "approved");
    return allApprovedJobs;
  };

  //Get all jobs submitted for approval from all employers
  getAllSubmittedJobs = () => {
    let allJobs = this.props.jobs;

    let allSubmittedJobs = allJobs.filter(job => job.status === "submitted");
    return allSubmittedJobs;
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
        
      default:
        return false;
    }
  };

  //----------BEGIN EVENT HANDLERS, CLICKS, SUBMITS--------BEGIN-------------//

  handleChangeSearchText = e => {
    this.setState({ searchText: e.target.value }, this.getFilteredJobs);
  };

  handleClickDisapproveBtn = currJob => {
   
   let id = currJob.id
   let title = currJob.title
   let body = currJob.body
   let status = 'draft'
  
    let URL = BASE_URL + "api/v1/jobs/" + id
    
    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({body: body, title: title, status: status}) 
    })
      .then(response => response.json())
      .then(data => console.log(data)) 
     }

     handleClickApproveBtn = currJob => {
      //get current id of current job
     //  debugger 
      let id = currJob.id
      let title = currJob.title
      let body = currJob.body
      let status = 'approved'
    
      let URL = BASE_URL + "api/v1/jobs/" + id
      
      return fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({body: body, title: title, status: status}) 
      })
        .then(response => response.json())
        .then(data => console.log(data)) 
       }

     //Employer clicks submit job, switch from is_draft to is_submitted
    handleClickSubmitBtn = currJob => {
        //get current id of current job
      
       let id = currJob.id
       let title = currJob.title
       let body = currJob.body
       let isDraft = !currJob.is_draft
       let isSubmitted = !currJob.is_submitted
       let isApproved = currJob.isApproved
     
       //Create new job object with newTitle and newBody
       
        let URL = BASE_URL + "api/v1/jobs/" + id
        
        return fetch(URL, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({body: body, title: title, is_approved:isApproved, is_submitted:isSubmitted, is_draft:isDraft}) 
        })
          .then(response => response.json())
          .then(data => console.log(data)) 
         }

    //--------------------END-----Event Handlers for Clicks, Submits-----END-------------------------------//

  render() {
    return (
      <Fragment>
        <Search
          latestClick={this.state.latestClick}
          handleChangeSearchText={this.handleChangeSearchText}
        />
        <div className="container">
          <AdminJobSidebar
            //State variables
            latestClick={this.state.latestClick}
            filteredJobs={this.getFilteredJobs()}
            currJob={this.state.currJob}
            //CRUD event handlers
            showJob={this.handleClickShowJob}
            newJob={this.handleClickNewBtn}
          />
          <AdminJobContent
            //State variables
            latestClick={this.state.latestClick}
            currTitle={this.state.currTitle}
            currBody={this.state.currBody}
            currJob={this.state.currJob}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            submitJob = {this.handleClickSubmitBtn}
            //CRUD event handlers
            status={this.props.status}
            activateJob = {this.handleClickActivateBtn}
            approveJob = {this.handleClickApproveBtn}
            disapproveJob = {this.handleClickDisapproveBtn}
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
)(withRouter(AdminJobsContainer));