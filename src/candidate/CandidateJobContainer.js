import React, { Component, Fragment } from "react";
import Search from "../common/Search";
import CandidateJobContent from "./CandidateJobContent";
import CandidateJobSidebar from "./CandidateJobSidebar";
import { connect } from "react-redux";
import { fetchJobs } from "../actions/index";
import { withRouter } from "react-router-dom";

const BASE_URL = "http://localhost:3000/";

class CandidateJobContainer extends Component {
  constructor() {
    super();
    this.state = {
      filteredJobs: [],
      currJob: null,
      currBody: "",
      currTitle: "",
      allCandidates: [],
      filteredCandidates: [],
      currCandidate: null,
      currFirstName: "",
      currLastName: "",
      latestClick: "",
      searchText: "",
      userType: ""
    };
  }

  //Set all jobs and filtered jobs on load of Main Container
  componentDidMount() {
    this.props.fetchJobs();
  }

  //Filter all jobs based on searchText
  getFilteredJobs = () => {
    return ''
  };

  getAllApprovedJobs = () => {
    let allJobs =  this.props.jobs
    let allApprovedJobs = allJobs.filter(job => job.status === "approved");
    return allApprovedJobs;
  };


  getAllMyJobs = () => {
    //Filter all jobs, return jobs belonging to current user
      let allJobs = this.props.jobs;
      let currUser = JSON.parse(localStorage.getItem("currUser"));
    //Filter through all jobs for jobs where user id matches curr user id
      let myJobs = allJobs.filter(job => job.users[0].id === currUser.id);
      return myJobs;
    };


    handleClickApplyBtn = currJob => {
      //get current id of current job
      let id = currJob.id;
      //get clicked job body
      let body = currJob.body
      let title = currJob.title
      let status = 'following'
  
      let appliedJob = { title: title, body: body, id: id, status:'status'};
      let URL = BASE_URL + "api/v1/jobs/" + id;
      
      return fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(appliedJob)
      })
        .then(response => response.json())
        .then(data => console.log(data));
    };


  handleClickFollowBtn = currJob => {
    //get current id of current job
    let id = currJob.id;

    //get clicked job body
    let body = currJob.body
    let title = currJob.title
    let status = 'following'

    let followedJob = { title: title, body: body, id: id, status:'following'};
    let URL = BASE_URL + "api/v1/jobs/" + id;
    
    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(followedJob)
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };


  handleClickUnfollowBtn = currJob => {
    //get current id of current job
    let id = currJob.id;

    //get clicked job body
    let body = currJob.body
    let title = currJob.title
    let status = 'unfollowed'

    let unfollowedJob = { title: title, body: body, id: id, status:status};
    let URL = BASE_URL + "api/v1/jobs/" + id;
    
    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(unfollowedJob)
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  //----------BEGIN EVENT HANDLERS, CLICKS, SUBMITS,

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

  //---------------BEGIN-----Event Handlers for Editing, Saving  Job-------------------------------//

  //--------------------END-----Event Handlers for Editing, Saving  Job-------------------------------//

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



  //Consider compoletely removing the "CandidateMainContainer etc etcs if this works out"

  render() {
    return (
      <Fragment>
        <Search
          latestClick={this.state.latestClick}
          handleChangeSearchText={this.handleChangeSearchText}
          currUser={this.props.currUser}
        />
        <div className="container">
          <CandidateJobSidebar
            //State variables
            latestClick={this.state.latestClick}
            allJobs={this.props.jobs}
            approvedJobs={this.getAllApprovedJobs()}
            currJob={this.state.currJob}
            //CRUD event handlers
            showJob={this.handleClickShowJob}
            applyJob={this.handleClickApplyBtn}
          />
          <CandidateJobContent
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
            followJob={this.handleClickFollowBtn}
            cancelJob={this.handleClickCancelBtn}
            deleteJob={this.handleClickDeleteBtn}
            newJob={this.handleClickNewBtn}
          />
        </div>
      </Fragment>
    )
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
)(withRouter(CandidateJobContainer));