import React, { Component, Fragment } from "react";
import CandidateJobContent from "./CandidateJobContent";
import CandidateJobSidebar from "./CandidateJobSidebar";
import { connect } from "react-redux";
import { fetchJobs } from "../../actions/index";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

class CandidateJobContainer extends Component {
  state = {
    currJob: null,
    currBody: "",
    currTitle: "",
    currCandidate: null,
    currFirstName: "",
    currLastName: "",
    latestClick: ""
  };

  componentDidMount() {
    const { fetchJobs } = this.props;
    fetchJobs();
  }

  updateJob = job => {
    let id = job.id;
    let title = job.title;
    let body = job.body;
    let status = job.status;
    let updatedJob = { id: id, title: title, body: body, status: status };
    return updatedJob;
  };

  handleClickApplyBtn = currJob => {
    let id = currJob.id;
    const { user } = this.props;
    let job = this.updateJob(currJob);
    job.user_id = user.id;

    return fetch(BASE_URL + "api/v1/jobs/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(job)
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };



  handleClickShowJob = currJob => {
    this.setState({
      currJob: currJob,
      currBody: currJob.body,
      currTitle: currJob.title,
      latestClick: "ShowJob"
    });
  };
  handleClickDeleteBtn = () => {
    let id = this.state.currJob.id;
    let URL = BASE_URL + "api/v1/jobs/" + id;
    let job = { id: id };
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

  render() {
    return (
      <Fragment>
        <div className="container">
          <CandidateJobSidebar
            latestClick={this.state.latestClick}
            currJob={this.state.currJob}
            applyJob={this.handleClickApplyBtn}
            showJob={this.handleClickShowJob}
            followJob={this.handleClickFollowBtn}
          />
          <CandidateJobContent
            latestClick={this.state.latestClick}
            currTitle={this.state.currTitle}
            currBody={this.state.currBody}
            currJob={this.state.currJob}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            applyJob={this.handleClickApplyBtn}
            showJob={this.handleClickShowJob}
            cancelJob={this.handleClickCancelBtn}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs.jobs,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
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
