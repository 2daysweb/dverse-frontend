const routes = [
    <Route
    exact
    path="/login"
    render={() => (loggedIn ? this.renderPortal() : <Login />)}
  />,
  <Route
    exact
    path="/admin"
    render={() => (loggedIn ? <AdminDashboard /> : <AdminLogin />)}
  />,
  <Route
    exact
    path="/admindashboard"
    render={() => <AdminDashboard />}
  />,
  <Route
    exact
    path="/submittedjobs"
    render={props => <AdminJobsContainer me={me} />}
  />,
  <Route
    exact
    path="/approvedjobs"
    render={() => <AdminJobsContainer me={me} />}
  />
]