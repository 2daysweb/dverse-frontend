export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const FETCH_CANDIDATES_BEGIN = "FETCH_CANDIDATES_BEGIN";
export const FETCH_CANDIDATES_SUCCESS = "FETCH_CANDIDATES_SUCCESS";
export const FETCH_CANDIDATES_FAILURE = "FETCH_CANDIDATES_FAILURE";
export const SELECT_CANDIDATE = "SELECT_CANDIDATE";

export const CREATE_JOB_BEGIN = "CREATE_JOB_BEGIN";
export const CREATE_JOB_SUCCESS = "CREATE_JOB_SUCCESS";
export const CREATE_JOB_FAILURE = "CREATE_JOB_FAILURE";

export const FETCH_JOBS_BEGIN = "FETCH_JOBS_BEGIN";
export const FETCH_JOBS_SUCCESS = "FETCH_JOBS_SUCCESS";
export const FETCH_JOBS_FAILURE = "FETCH_JOBS_FAILURE";

export const EDIT_JOB_BEGIN = "EDIT_JOB_BEGIN";
export const EDIT_JOB_SAVE = "EDIT_JOB_SAVE";
export const EDIT_JOB_SUCCESS = "EDIT_JOB_SAVE";
export const EDIT_JOB_FAILURE = "EDIT_JOB_SAVE";
export const EDIT_JOB_CANCEL = "EDIT_JOB_CANCEL";

export const DELETE_JOB_BEGIN = "DELETE_JOB_BEGIN";
export const DELETE_JOB_SUCCESS = "DELETE_JOB_SUCCESS";
export const DELETE_JOB_FAILURE = "DELETE_JOB_FAILURE";
export const SELECT_JOB = "SELECT_JOB";

export const UPDATE_STATUS_BEGIN = "UPDATE_STATUS_BEGIN";
export const UPDATE_STATUS_SUCCESS = "UPDATE_STATUS_SUCCESS";
export const UPDATE_STATUS_FAILURE = "UPDATE_STATUS_FAILURE";

export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_DRAFTED: "SHOW_DRAFTED",
  SHOW_SUBMITTED: "SHOW_SUBMITTED",
  SHOW_APPROVED: "SHOW_APPROVED"
};

//-------------------------------------------TYPES----------------------------------//--------------------------------

export const loginBegin = (email, password) => ({
  type: LOGIN_BEGIN,
  payload: { email, password }
});

export const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token: data.token,
      user: data.user
    }
  };
};

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
  payload: { failure: true }
});

export const logout = () => ({
  type: LOGOUT
});

//------------------------------------------CREATORS------------------------------//------------------------------------

export const fetchCandidatesBegin = () => ({
  type: FETCH_CANDIDATES_BEGIN
});

export const fetchCandidatesSuccess = users => ({
  type: FETCH_CANDIDATES_SUCCESS,
  payload: { users }
});

export const fetchCandidatesFailure = err => ({
  type: FETCH_CANDIDATES_FAILURE,
  payload: { err }
});

export const selectCandidate = candidate => ({
  type: SELECT_CANDIDATE,
  payload: { candidate }
});

export const createJobBegin = () => ({
  type: CREATE_JOB_BEGIN
});

export const createJobSuccess = job => {
  return {
    type: CREATE_JOB_SUCCESS,
    payload: { job }
  };
};
export const createJobFailure = err => ({
  type: CREATE_JOB_FAILURE,
  payload: { err }
});

export const deleteJobBegin = () => ({
  type: DELETE_JOB_BEGIN
});

export const deleteJobSuccess = id => {
  return {
    type: DELETE_JOB_SUCCESS,
    payload: { id }
  };
};
export const deleteJobFailure = err => ({
  type: DELETE_JOB_FAILURE,
  payload: { err }
});

export const fetchJobsBegin = () => ({
  type: FETCH_JOBS_BEGIN
});

export const fetchJobsSuccess = jobs => ({
  type: FETCH_JOBS_SUCCESS,
  payload: { jobs }
});

export const fetchJobsFailure = err => ({
  type: FETCH_JOBS_FAILURE,
  payload: { err }
});

export const selectJob = job => ({
  type: SELECT_JOB,
  payload: { job }
});

export const setFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  payload: { filter }
});

export const updateStatusBegin = () => {
  return {
    type: UPDATE_STATUS_BEGIN
  };
};

export const updateStatusSuccess = (id, status) => ({
  type: UPDATE_STATUS_SUCCESS,
  payload: { id, status }
});

export const updateStatusFailure = err => {
  return {
    type: UPDATE_STATUS_SUCCESS,
    payload: { err }
  };
};

//------------------------------------------HELPERS----------------------------------------------------------------//

const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

export const setUser = (email, password) => {
  return async dispatch => {
    dispatch(loginBegin(email, password));
    
    const response = await fetch(BASE_URL + "api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        HTTP_AUTHORIZATION: "Bearer <super encoded JWT>",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    const data = await response.json();
    if (data.authenticated) {
      return dispatch(loginSuccess(data));
    } else {
      dispatch(loginFailure())
      alert("Incorrect username or password")
    }
  }
}

//----------------------------------------------------HELPERS-----------------------------------------------//

export const createJob = id => {
  return async dispatch => {
    try {
      dispatch(createJobBegin());
      const response = await fetch(BASE_URL + "api/v1/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user_id: id
        })
      });
      const data = await response.json();
      return dispatch(createJobSuccess(data));
    } catch (err) {
      dispatch(createJobFailure(err));
    }
  };
};

export const deleteSelected = id => {
  return async dispatch => {
    try {
      dispatch(deleteJobBegin());
      const response = await fetch(BASE_URL + "api/v1/jobs/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(id)
      });
      const data = await response.json();
      dispatch(deleteJobSuccess(data));
    } catch (err) {
      dispatch(deleteJobFailure(err));
    }
  };
};

export const editJob = () => {
  return null;
};

export const fetchCandidates = () => {
  return async dispatch => {
    try {
      dispatch(fetchCandidatesBegin());
      const response = await fetch(BASE_URL + "api/v1/users");
      const data = await response.json();
      dispatch(fetchCandidatesSuccess(data));
    } catch (err) {
      dispatch(fetchCandidatesFailure(err));
    }
  };
};

export const fetchJobs = () => {
  return async dispatch => {
    try {
    dispatch(fetchJobsBegin());
   const response = await fetch(BASE_URL + "api/v1/jobs")
   const data = await response.json()
   dispatch(fetchJobsSuccess(data))
    } catch(err) {
      dispatch(fetchJobsFailure(err))
    }
  };
};

export const setVisibilityFilter = filter => {
  return setFilter(filter);
};

export const setSelected = job => {
  return selectJob(job);
};

export const updateStatus = (job, status, user) => {
  const { id } = job;
  const user_id = user.id;
  return async dispatch => {
    try {
      dispatch(updateStatusBegin());
      const response = await fetch(BASE_URL + "api/v1/jobs/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ id: id, status: status, user_id: user_id })
      });
      const data = await response.json();
      dispatch(updateStatusSuccess(id, status));
    } catch (err) {
      dispatch(updateStatusFailure(err));
    }
  };
};
