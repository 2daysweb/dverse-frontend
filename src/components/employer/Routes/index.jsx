export const routes = [
<Route
exact
path="/employerdashboard"
render={() => <EmployerDashboard />}
/>, 
<Route
exact
path="/alljobs"
render={() => <EmployerJobsContainer me={me} />}
/>,
<Route
exact
path="/pendingjobs"
render={() => <EmployerJobsContainer me={me} />}
/>,
<Route
exact
path="/employerjobs"
render={() => <EmployerJobsContainer me={me} />}
/>,
<Route
exact
path="/draftjobs"
render={props => (
  <div>
    <EmployerJobsContainer me={me} {...props} />
  </div>
)}
/>
]