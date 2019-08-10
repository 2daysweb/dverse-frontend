import React, { Component } from "react";
import SignUp from "./SignUpHeader";
import LoginHeader from "./LoginHeader";
import LandingPage from "./LandingPage";
import JobPostingContainer from "./JobPostingContainer";
import Applications from "./Applications";
// import Header from './Header';
import { BrowserRouter as Switch, Route } from "react-router-dom";

const routes = [
  //Sign Up
  { path: "/user", component: <SignUp /> },
  { path: "/login/:", component: <LoginHeader /> },
  { path: "/candidates", component: <JobPostingContainer /> },
  { path: "/applications", component: <Applications /> },
  { path: "/", component: <LandingPage /> }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currInputLoginUN: "",
      currInputLoginPW: ""
      //isAuth --- use when adding authentication
    };
  }

  authenticate = (UN, PW) => {};

  handleChangeInputUN = e => {
    debugger;
    console.log("In Handle Text Input Change Parent in App");
  };

  handleChangeInputPW = e => {
    debugger;
    console.log("In Handle Text Input Change Parent in App");
  };

  handleChangeInputNewUN = e => {
    debugger;
    console.log("In Handle Text Input Change Parent in App");
  };

  handleChangeInputNewPW = e => {
    debugger;
    console.log("In Handle Text Input Change Parent in App");
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <LandingPage
                {...props}
                handleChangeInputUN={this.handleChangeInputUN}
                handleChangeInputUN={this.handleChangeInputPW}
                handleChangeInputNewUN={this.handleChangeInputNewUN}
                handleChangeInputNewPW={this.handleChangeInputNewPW}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => <LoginHeader {...props} />}
          />
          <Route
            exact
            path="/createUser"
            render={props => (
              <SignUp
                {...props}
           
              />
            )}
          />
          <Route exact path="/candidates" />
          <Route
            exact
            path="/applications"
            render={props => <Applications {...props} />}
          />
        </Switch>
        ))}
      </div>
    );
  }
}



export default App;

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
