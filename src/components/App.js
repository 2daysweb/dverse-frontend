
import React, { Component } from 'react';
import Header from './Header';
import { Route } from 'react-router'

import JobPostingContainer from './JobPostingContainer';

class App extends Component {
  render() {
    return (
      <div className="app">
      <Route
  path='/'
  render={(props) => <JobPostingContainer{...props} />}
/>
      </div>
    );
  }
}

export default App;

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