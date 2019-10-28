import React, { Component, Fragment } from "react";
import JobContent from "../../../components/admin/JobContent";
import JobSidebar from "../../../components/admin/JobSidebar";
import { fetchJobs } from "../../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

class JobsContainer extends Component {
  state = {};

  componentDidMount() {
    const { fetchJobs } = this.props;
    fetchJobs();
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <JobSidebar />
          <JobContent />
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
)(withRouter(JobsContainer));
