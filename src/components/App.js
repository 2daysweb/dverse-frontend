import React, { Component } from "react";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import NavBar from "./Nav";
import CandidatePortalContainer from "./CandidatePortalContainer";
import AdminPortalContainer from "./AdminPortalContainer";
import PortalContainer from "./PortalContainer";
import EmployerPortalContainer from "./EmployerPortalContainer";
import Applications from "./Applications";
import SignUpForm from "./SignUpForm";
import LandingNav from "./LandingNav";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currUser: null
      // logged_in: false
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
          this.setState({ currUser: userObj });
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
    //////debugger   ;
    let userType = this.state.currUser.user_type;
    switch (userType) {
      case "employer":
        return (
          <div>
            <NavBar
              updateCurrentUser={this.updateCurrentUser}
              currUser={this.state.currUser}
            />
            <EmployerPortalContainer currUser={this.state.currUser} />
          </div>
        );

      case "candidate":
        return (
          <div>
            <NavBar
              updateCurrentUser={this.updateCurrentUser}
              currUser={this.state.currUser}
            />
            <CandidatePortalContainer currUser={this.state.currUser} />
          </div>
        );

      case "admin":
        return (
          <div>
            <NavBar
              updateCurrentUser={this.updateCurrentUser}
              currUser={this.state.currUser}
            />
            <AdminPortalContainer currUser={this.state.currUser} />
          </div>
        );

      default:
        return false;
    }
  };
  //If there's a current user, go to renderPortal method with the user_type
  //Else, go to to LoginPage

  //Conditionally render Employer, Admin, or Candidate Portal If Authenticated --- Else, render LandingPage

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/login"
            render={() =>
              this.state.currUser ? (
                this.renderPortal()
              ) : (
                <LoginPage
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
              )
            }
          />

          <Route
            exact
            path="/landing"
            render={props => (
              <LandingPage
                {...props}
                handleLoginSubmit={this.handleLoginSubmit}
                handleSignupSubmit={this.handleSignUpSubmit}
              />
            )}
          />
          <Route
            exact
            path="/candidates"
            component={props => <PortalContainer />}
          />
          <Route
            exact
            path="/applications"
            render={() => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <Applications currUser={this.state.currUser} />
              </div>
            )}
          />
          <Route
            exact
            path="/signup"
            component={props => <SignUpForm {...props} />}
          />

          <Route
            exact
            path="/jobs"
            render={() => (
              <div>
                <NavBar
                  updateCurrentUser={this.updateCurrentUser}
                  currUser={this.state.currUser}
                />
                <CandidatePortalContainer currUser={this.state.currUser} />
              </div>
            )}
          />
          <Route
            exact
            path="/"
            render={() =>
              this.state.currUser ? (
                this.renderPortal()
              ) : (
                <Redirect to="/landing" />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;

// componentDidUpdate(prevProps) {
//   // Typical usage (don't forget to compare props):
//   if (this.props.userID !== prevProps.userID) {
//     this.fetchData(this.props.userID);
//   }
// }

// componentDidUpdate(prevProps){
//   if(this.props.location.pathname !== prevProps.location.pathname){
//   this.setState({currPath:this.props.location.pathname})
//   }
// }
// /*
//           <Route
//             path="/about"
//             render={props => <About {...props} extra={someVariable} />}
//           /> */
// {
//   this.props.location.pathname === ("landing" || '/') ? (
//      <LandingNav/>
//   ) : (
//     <NavBar
//     updateCurrentUser={this.updateCurrentUser}
//     currUser={this.state.currUser}
//   />
//   )
// }

// renderLandingOrLogin = () => {
//   return this.state.currPath === "/login" ? (
//     <LoginPage updateCurrentUser={this.updateCurrentUser} />
//   ) : (
//     <div>
//       <LandingNav />
//       <LandingPage />
//     </div>
//   );
// };
// <Route exact path="/jobs" render={() => currUser.user_type === 'candidate'?
// (<CandidatePortalContainer/>):(<EmployerPortalContainer/>)
//   />}
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

//Highest impact changes to make:

//1. DONE---------DONE------Landing page routes properly----DONE------
//2.) DONE---------DONE------Remove the check box from the signup form-------DONE---------DONE------
//2.5) Update the NavBar in EmployerPortalContainer to look halfway decent
//3.) Update signup form to include data from signup from
//4.) Update the User controller to set user data once there
//5.) Create an Employer Home component that is first view on login, Repeat for Candidate
//6.) Update UserModel to include a field for candidate_name
