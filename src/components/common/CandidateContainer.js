import React, { Component, Fragment } from "react";
import Search from "./Search";
import CandidateContent from "../candidate/CandidateContent";
import CandidateSidebar from "../candidate/CandidateSidebar";
import { connect } from "react-redux";
import { fetchCandidates } from "../../actions/index";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

class CandidateContainer extends Component {
  state = {
    currCandidate: {},
    filteredCandidates: [],
    currCandidate: {},
    currFirstName: "",
    currLastName: "",
    currResume: "",
    currAvatar: "",
    currSkills: [],
    currAvatar: "",
    latestClick: "",
    searchText: "",
    candidateType: ""
  };
  componentDidMount() {
    this.props.fetchCandidates();
  }

  handleChangeSearchText = e => {
    this.setState({ searchText: e.target.value})
  };

  handleClickShowCandidate = candidate => {
    this.setState({
      currCandidate: candidate,
      currFirstName: currCandidate.first_name,
      currLastName: currCandidate.last_name,
      latestClick: "ShowCandidate"
    });
  };

  getCandidates = () => {
    return this.props.candidates.filter(user => user.user_type == "candidate");
  };

  handleChangeTextArea = editedBody => {
    let newBody = editedBody;
    this.setState({ currBody: newBody });
  };

  handleChangeInput = editedTitle => {
    this.setState({ currTitle: editedTitle });
  };

  handleClickCancelBtn = () => {
    this.setState({ latestClick: "ShowCandidate" });
  };

  render() {
    return (
      <Fragment>
        <Search
          latestClick={this.state.latestClick}
          handleChangeSearchText={this.handleChangeSearchText}
          currCandidate={this.props.currCandidate}
        />
        <div className="container">
          <CandidateSidebar
            latestClick={this.state.latestClick}
            allCandidates={this.getCandidates()}
            currCandidate={this.state.currCandidate}
            showCandidate={this.handleClickShowCandidate}
            currCandidate={this.props.currCandidate}
          />
          <CandidateContent
            latestClick={this.state.latestClick}
            currTitle={this.state.currTitle}
            currBody={this.state.currBody}
            currCandidate={this.state.currCandidate}
            handleChangeInput={this.handleChangeInput}
            handleChangeTextArea={this.handleChangeTextArea}
            showCandidate={this.handleClickShowCandidate}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidates: state.candidates.candidates,
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  console.log(fetchCandidates());
  return {
    fetchCandidates: () => {
      dispatch(fetchCandidates());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CandidateContainer));
