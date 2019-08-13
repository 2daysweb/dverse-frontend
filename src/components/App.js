import React, { Component } from "react";
// import LoginForm from "./LoginForm";
import LandingPage from "./LandingPage";
import CandidatePortalContainer from "./CandidatePortalContainer";
import AdminPortalContainer from "./AdminPortalContainer";
import JobPostingContainer from "./JobPostingContainer";
import EmployerPortalContainer from "./EmployerPortalContainer";
import Applications from "./Applications";
import SignUpForm from "./SignUpForm";
import NavBar from "./Nav";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currUser: null,
      logged_in: false
    };
  }

  //On load of Application, check if JWT exists, if it does, set state of logged_in and currUser

  componentDidMount() {
    let token = localStorage.getItem("jwt");
    if (token) {
      fetch("http://localhost:3000/api/v1/profile", {
        headers: { Authentication: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(userObj => {
          console.log(userObj);
          this.setState({ logged_in: true, currUser: userObj });
        });
    }
  }

  //--------------------BEGIN LOGIN UN/PW INPUT, SUBMIT LOGIN CREDENTIALS---------------//

  updateCurrentUser = currUser => {
    this.setState({ currUser: currUser });
  };

  //-----------------END LOGIN INPUTs, SUBMIT LOGIN CREDENTIALS---------------------------//

  //--------------------BEGIN NEW USER SIGN UP INPUTs, SUBMIT SIGNUP DETAILS----------------//

  handleSubmitSignup = () => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  //--------------------END NEW USER SIGN UP INPUTs, SUBMIT SIGNUP DETAILS----------------//

  //Conditionally render portal based on curr user type
  renderPortal = () => {
    let userType = this.state.currUser.user_type;
    switch (userType) {
      case "employer":
        return <EmployerPortalContainer />;
        break;
      case "candidate":
        return <CandidatePortalContainer />;
        break;
      case "admin":
        return <AdminPortalContainer />;
        break;
      default:
        return false;
    }
  };

  render() {
    return (
      <div className="app">
        <NavBar
          updateCurrentUser={this.updateCurrentUser}
          currUser={this.state.currUser}
        />
        <Switch>
          <Route
            exact
            path="/login"
            render={() =>
              this.state.currUser ? (
                //Conditionally render Employer, Admin, or Candidate Portal If Authenticated
                this.renderPortal()
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/landing"
            render={props => (
              <LandingPage
                {...props}
                handleChangeInputUN={this.handleChangeInputUN}
                handleChangeInputPW={this.handleChangeInputPW}
                currInputLoginUN={this.state.currInputLoginUN}
                currInputLoginPW={this.state.currInputLoginPW}
                handleLoginSubmit={this.handleLoginSubmit}
              />
            )}
          />
          <Route
            exact
            path="/candidates"
            component={props => <JobPostingContainer />}
          />
          <Route
            exact
            path="/applications"
            render={props => <Applications {...props} />}
          />
          <Route
            exact
            path="/createUser"
            render={props => <SignUpForm {...props} />}
          />
          <Route exact path="/" render={() => <Redirect to="/login" />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

// fetch('http://localhost:3000/api/v1/users/1',{
//   method: 'GET',
//   headers: {'Content-Type':'application/json'},
//   body: JSON.stringify({
//     email: 'sahnunhm@gmail.com',
//     password:'pw1'
//   })
// })
// .then(res => res.json())
// .then(data => console.log(data))

// fetch('http://localhost:3000/api/v1/login',{
//   method: 'POST',
//   headers: {'Content-Type':'application/json'},
//   body: JSON.stringify({
//     email: 'sahnunhm@gmail.com',
//     password:'pw1'
//   })
// })
// .then(res => res.json())
// .then(data => console.log(data))

// (data => {
//   if(data.authenticated){
//     //update state
//     this.props.updateCurrentUser(data.user)
//     //store the token in localStorage
//     localStorage.setItem("jwt", data.token)
//   }else{
//     alert("incorrect username or password")
//   }
// })

//TODO: Finish refactoring JSX to use .map with routes array
// {routes.map(({ path, component:C }) => (
//   <Route path={path}
//   render={props => <C {...props} />}

//    />

// <Router>
// <div>
//   <ul>
//     <li><Link to="/home">Home</Link></li>
//     <li><Link to="/applications">Applications</Link></li>
//     <li><Link to="/logout">Logout</Link></li>
//   </ul>

//   {routes.map((route) => (
//     <Route
//       key={route.path}
//       path={route.path}
//       component={route.component}
//     />
//   ))}
// </div>
// </Router>

// const routes = [
//   {
//     path: '/home',
//     component: EmployerPortalContainer
//   },
//   {
//     path: '/logout',
//     component: Login,
//   }
// ]

/* <Route
            exact
            path="/"
            render={props => (
              <LoginHeader
                {...props}
                handleChangeInputUN={this.handleChangeInputUN}
                handleChangeInputPW={this.handleChangeInputPW}
                currInputLoginUN={this.state.currInputLoginUN}
                currInputLoginPW={this.state.currInputLoginPW}
                handleLoginSubmit={this.handleLoginSubmit}
                logged_in={this.state.user}
                updateCurrentUser={this.updateCurrentUser}
              />
            )}
          /> */
/* <Nav
          user={this.state.currUser}
          logged_in={this.state.logged_in}
          handleChangeInputUN={this.handleChangeInputUN}
          handleChangeInputPW={this.handleChangeInputPW}
          currInputLoginUN={this.state.currInputLoginUN}
          currInputLoginPW={this.state.currInputLoginPW}
          updateCurrentUser = {this.updateCurrentUser}
          // handleLoginSubmit={this.handleLoginSubmit}
        /> */

// handleChangeInputNewUN = currNewUsername => {
//   this.setState({ currInputLoginUN: currNewUsername });
//   console.log("In Handle Text Input Change Parent in App");
// };

// handleChangeInputNewPW = currNewPassword => {
//   this.setState({ currInputLoginPW: currNewPassword });
//   console.log("In Handle Text Input Change Parent in App");
// };
