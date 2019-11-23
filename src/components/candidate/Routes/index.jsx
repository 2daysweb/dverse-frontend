const routes = [
    <Route
    exact
    path="/candidatedashboard"
    render={props => (
    <CandidateDashboard />
    )}/>,
    <Route
    exact
    path="/candidatejobs"
    render={() => <CandidateJobsContainer me={me} />}/>,
    <Route exact path="/profile" render={() => <Profile me={me} />} />,
    <Route exact path="/signup" render={props => <SignUp {...props} />} />
  />
]