import React, { Component, Fragment } from "react";
import CandidateContent from "../../components/candidate/CandidateContent";
import CandidateSidebar from "../../components/candidate/CandidateSidebar";
import { connect } from "react-redux";
import { fetchCandidates } from "../../../actions";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

class CandidatesContainer extends Component {
  state = {};
  componentDidMount() {
    const { fetchCandidates } = this.props;
    fetchCandidates();
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <CandidateSidebar />
          <CandidateContent />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidates: state.candidates.candidates,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCandidates: () => {
      dispatch(fetchCandidates());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CandidatesContainer));
