import React, { Component, Fragment } from "react";
import Search from "./Search";
import CandidateContent from "../candidate/CandidateContent";
import CandidateSidebar from "../candidate/CandidateSidebar";
import { connect } from "react-redux";
import { fetchUsers } from "../actions/index";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-frontend.herokuapp.com/";

class CandidateContainer extends Component {
  constructor() {
    super();
    this.state = {
      currCandidate: {},
      allCandidates: [],
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
      userType: ""
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  //---------------------BEGIN EVENT HANDLERS----------------------------//

  handleChangeSearchText = e => {
    this.setState({ searchText: e.target.value }, this.getFilteredCandidates);
  };

  handleClickShowCandidate = currCandidate => {
    this.setState({ currCandidate: currCandidate });
    this.setState({ currFirstName: currCandidate.first_name });
    this.setState({ currLastName: currCandidate.last_name });
    this.setState({ latestClick: "ShowCandidate" });
  };

  getCandidates = () => {
    return this.props.users.filter(user => user.user_type == "candidate");
  };

  handleChangeTextArea = editedBody => {
    let newBody = editedBody;
    this.setState({ currBody: newBody });
  };

  handleChangeInput = editedTitle => {
    this.setState({ currTitle: editedTitle });
  };

  //--------------------END EVENT HANDLERS---------------------------------------//
  handleClickCancelBtn = () => {
    this.setState({ latestClick: "ShowCandidate" });
  };

  render() {
    return (
      <Fragment>
        <Search
          latestClick={this.state.latestClick}
          handleChangeSearchText={this.handleChangeSearchText}
          currUser={this.props.currUser}
        />
        <div className="container">
          <CandidateSidebar
            latestClick={this.state.latestClick}
            allCandidates={this.getCandidates()}
            currCandidate={this.state.currCandidate}
            showCandidate={this.handleClickShowCandidate}
            newCandidate={this.handleClickNewBtn}
            currUser={this.props.currUser}
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
    users: state.users.users
  };
};

const mapDispatchToProps = dispatch => {
  console.log(fetchUsers());
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CandidateContainer));
