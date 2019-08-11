import React, { Component } from "react";
import SignUpHeader from "./SignUpHeader";
import LoginHeader from "./LoginHeader";
import LandingPage from "./LandingPage";
import JobPostingContainer from "./JobPostingContainer";
import Applications from "./Applications";
// import Header from './Header';
import { BrowserRouter as Switch, Route } from "react-router-dom";

// const routes = [
//   //Sign Up
//   { path: "/user", component: <SignUp /> },
//   { path: "/login/:", component: <LoginHeader /> },
//   { path: "/candidates", component: <JobPostingContainer /> },
//   { path: "/applications", component: <Applications /> },
//   { path: "/", component: <LandingPage /> }
// ];

class App extends Component {
  //authenticate = (UN, PW) => {};

  constructor() {
    super();
    this.state = {
      currUser:null,
      currInputLoginUN: "",
      currInputLoginPW: ""
    };
  }

//--------------------BEGIN LOGIN UN/PW INPUT, SUBMIT LOGIN CREDENTIALS---------------//
  
updateCurrentUser = (user) => {
  this.setState({user})
}

  handleChangeInputUN = currUsername => {
    this.setState({ currInputLoginUN: currUsername });
  };

  handleChangeInputPW = currPassword => {
    this.setState({ currInputLoginPW: currPassword });
  };

  handleLoginSubmit = () =>  {
 
    fetch('http://localhost:3000/api/v1/login', {
    	method: "POST",
    	headers: {"Content-Type":"application/json"},
    	body: JSON.stringify({
    	  email: this.state.currInputLoginUN,
    		password: this.state.currInputLoginPW
    	})
    }).then(res => res.json())
    .then(data => console.log(data))
  }


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
//-----------------END LOGIN INPUTs, SUBMIT LOGIN CREDENTIALS---------------------------//

  //--------------------BEGIN NEW USER SIGN UP INPUTs, SUBMIT SIGNUP DETAILS----------------//

  handleChangeInputNewUN = currNewUsername => {
    this.setState({currInputLoginUN:currNewUsername})
    console.log("In Handle Text Input Change Parent in App");
  };

  handleChangeInputNewPW = currNewPassword => {
    this.setState({currInputLoginPW:currNewPassword})
    console.log("In Handle Text Input Change Parent in App");
  };


  handleSubmitSignup = () =>  {
//  debugger 
    fetch('http://localhost:3000/api/v1/users', {
    	method: "POST",
    	headers: {"Content-Type":"application/json"},
    	body: JSON.stringify({
    		username: this.state.currInputLoginUN,
    		password: this.state.currInputLoginPW
    	})
    }).then(res => res.json())
    .then(data => console.log(data))
  }
  
    //--------------------END NEW USER SIGN UP INPUTs, SUBMIT SIGNUP DETAILS----------------//

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
                handleChangeInputPW={this.handleChangeInputPW}
                currInputLoginUN={this.state.currInputLoginUN}
                currInputLoginPW={this.state.currInputLoginPW}
                handleLoginSubmit={this.handleLoginSubmit}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <LoginHeader
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
            path="/createUser"
            render={props => <SignUpHeader 
              {...props}
            handleChangeInputNewUN={this.handleChangeInputNewUN}
            handleChangeInputNewPW={this.handleChangeInputNewPW}
            currInputLoginUN={this.state.currInputLoginUN}
            currInputLoginPW={this.state.currInputLoginPW}
            handleSubmitSignup={this.handleSubmitSignup} 
            />}
          />
          <Route
            exact
            path="/candidates"
            render={props => <JobPostingContainer {...props} />}
          />
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
