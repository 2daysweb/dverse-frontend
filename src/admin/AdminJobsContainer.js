import React, { Component, Fragment } from "react";
import Search from "../common/Search";
import AdminJobSidebar from "./AdminJobSidebar";
import AdminJobContent from "./AdminJobContent";
import { connect } from "react-redux";
import { fetchJobs } from "../actions/index";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";


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

  //fetch jobs on mount
  componentDidMount() {
    this.props.fetchJobs();
  }

  componentDidUpdate(prevProps, prevState) {
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

  //get all jobs pending approval (status = submitted)
  getAllSubmittedJobs = () => {
    let allJobs = this.props.jobs;

    let allSubmittedJobs = allJobs.filter(job => job.status === "submitted");
    return allSubmittedJobs;
  };

  getFilteredJobs = () => {
    let currUserType = JSON.parse(localStorage.getItem("currUser")).user_type;
    let status = this.props.status;
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
  
    let URL = BASE_URL + "api/v1/jobs" + id
    
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
      let id = currJob.id
      let title = currJob.title
      let body = currJob.body
      let status = 'approved'
    
      let URL = BASE_URL + "api/v1/jobs" + id
      
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

    handleClickSubmitBtn = currJob => {      
       let id = currJob.id
       let title = currJob.title
       let body = currJob.body
       let status = 'approved'
       let URL = BASE_URL + "api/v1/jobs" + id
        
        return fetch(URL, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({id: id, status:status, body: body, title: title}) 
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
            latestClick={this.state.latestClick}
            filteredJobs={this.getFilteredJobs()}
            currJob={this.state.currJob}
            showJob={this.handleClickShowJob}
            newJob={this.handleClickNewBtn}
          />
          <AdminJobContent
            latestClick={this.state.latestClick}
            currTitle={this.state.currTitle}
            currBody={this.state.currBody}
            currJob={this.state.currJob}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            submitJob = {this.handleClickSubmitBtn}
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