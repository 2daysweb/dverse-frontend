import React, { Component, Fragment } from "react";
import Search from "./Search";
import CandidateContent from "../candidate/CandidateContent";
import CandidateSidebar from "../candidate/CandidateSidebar";
import { connect } from "react-redux";
import { fetchUsers } from "../actions/index";
import { withRouter } from "react-router-dom";

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

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

  //Set all candidates and filtered candidates on load of Main Container
  componentDidMount() {
   this.props.fetchUsers()
  }

  //----------BEGIN EVENT HANDLERS, CLICKS, SUBMITS,

  handleChangeSearchText = e => {
    this.setState({ searchText: e.target.value }, this.getFilteredCandidates);
  };

  //Refactor the SetState to be only one single object --- with KV pairs

  handleClickShowCandidate = currCandidate => {
    this.setState({ currCandidate: currCandidate });
    this.setState({ currFirstName: currCandidate.first_name });
    this.setState({ currLastName: currCandidate.last_name });
    this.setState({ latestClick: "ShowCandidate" });
  };

  getCandidates = () => {
    return this.props.users.filter(user => user.user_type == 'candidate')     
  }

  
  //---------------BEGIN-----Event Handlers for Editing, Saving  Candidate-------------------------------//

  handleChangeTextArea = editedBody => {
    let newBody = editedBody;
    this.setState({ currBody: newBody });
  };

  handleChangeInput = editedTitle => {
    this.setState({ currTitle: editedTitle });
  };

  //--------------------END-----Event Handlers for Editing, Saving  Candidate-------------------------------//

  //Discard any changes made and render "Show" of Current Candidate
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
            //State variables
            latestClick={this.state.latestClick}
            allCandidates = {this.getCandidates()}
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
