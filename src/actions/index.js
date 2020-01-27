export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const REQUEST_CANDIDATES_BEGIN = "REQUEST_CANDIDATES_BEGIN";
export const REQUEST_CANDIDATES_SUCCESS = "REQUEST_CANDIDATES_SUCCESS";
export const REQUEST_CANDIDATES_FAILURE = "REQUEST_CANDIDATES_FAILURE";
export const SELECT_CANDIDATE = "SELECT_CANDIDATE";

export const CREATE_JOB_BEGIN = "CREATE_JOB_BEGIN";
export const CREATE_JOB_SUCCESS = "CREATE_JOB_SUCCESS";
export const CREATE_JOB_FAILURE = "CREATE_JOB_FAILURE";

export const REQUEST_JOBS_BEGIN = "REQUEST_JOBS_BEGIN";
export const REQUEST_JOBS_SUCCESS = "REQUEST_JOBS_SUCCESS";
export const REQUEST_JOBS_FAILURE = "REQUEST_JOBS_FAILURE";

export const EDIT_JOB_BEGIN = "EDIT_JOB_BEGIN";
export const EDIT_JOB_CANCEL = "EDIT_JOB_CANCEL";
export const SAVE_JOB_BEGIN = "SAVE_JOB_BEGIN";
export const SAVE_JOB_SUCCESS = "SAVE_JOB_SUCCESS";
export const SAVE_JOB_FAILURE = "SAVE_JOB_FAILURE";

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
export const fetchCandidatesBegin = () => ({
  type: REQUEST_CANDIDATES_BEGIN
});
export const fetchCandidatesSuccess = users => ({
  type: REQUEST_CANDIDATES_SUCCESS,
  payload: { users }
});
export const fetchCandidatesFailure = err => ({
  type: REQUEST_CANDIDATES_FAILURE,
  payload: { err }
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
export const deleteJobSuccess = () => {
  return {
    type: DELETE_JOB_SUCCESS
  };
};
export const deleteJobFailure = err => ({
  type: DELETE_JOB_FAILURE,
  payload: { err }
});
export const fetchJobsBegin = () => ({
  type: REQUEST_JOBS_BEGIN
});
export const fetchJobsSuccess = jobs => ({
  type: REQUEST_JOBS_SUCCESS,
  payload: { jobs }
});
export const fetchJobsFailure = err => ({
  type: REQUEST_JOBS_FAILURE,
  payload: { err }
});
export const editJobBegin = () => {
  return {
    type: EDIT_JOB_BEGIN
  };
};
export const editJobCancel = () => {
  return {
    type: EDIT_JOB_CANCEL
  };
};
export const saveJobBegin = () => ({
  type: SAVE_JOB_BEGIN
});
export const saveJobSuccess = (job, body, title) => {
  return {
    type: SAVE_JOB_SUCCESS,
    payload: { job, body, title }
  };
};
export const saveJobFailure = err => {
  return {
    type: SAVE_JOB_FAILURE,
    payload: { err }
  };
};
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
export const updateStatusSuccess = (id, status, user) => ({
  type: UPDATE_STATUS_SUCCESS,
  payload: { id, status, user}
});
export const updateStatusFailure = err => {
  return {
    type: UPDATE_STATUS_SUCCESS,
    payload: { err }
  };
};
const BASE_URL = "http://localhost:3000/";
export const setUser = (email, password) => {
  return async dispatch => {
    try {
      dispatch(loginBegin(email, password));
      const resp = await fetch(BASE_URL + "api/login", {
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
      });
      const data = await resp.json();
      if (data.authenticated) {
        return dispatch(loginSuccess(data));
      } else {
        dispatch(loginFailure());
        alert("Invalid Username or Password. Login Failed.");
      }
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };
};
export const createJob = id => {
  return async dispatch => {
    try {
      dispatch(createJobBegin());
      const resp = await fetch(BASE_URL + "api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user_id: id
        })
      });
      const data = await resp.json();
      return dispatch(createJobSuccess(data));
    } catch (err) {
      console.log("ERROR: ", err);
      dispatch(createJobFailure(err));
    }
  };
};
export const deleteJob = id => {
  return async dispatch => {
    try {
      dispatch(deleteJobBegin());
      const resp = await fetch(BASE_URL + "api/jobs/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(id)
      });
      const data = await resp.json();
      dispatch(deleteJobSuccess(data));
    } catch (err) {
      console.log("ERROR: ", err);
      dispatch(deleteJobFailure(err));
    }
  };
};
export const editJob = () => {
  return editJobBegin();
};
export const editCancel = () => {
  return editJobCancel();
};
export const saveJob = (job, body, title) => {
  const { id } = job;
  return async dispatch => {
    try {
      dispatch(saveJobBegin());
      const resp = await fetch(BASE_URL + "api/jobs/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          id: id,
          body: body,
          title: title
        })
      });
      const data = await resp.json();
      console.log(data);
      dispatch(saveJobSuccess(id));
    } catch (err) {
      console.log("ERROR: ", err);
      dispatch(saveJobFailure(err));
    }
  };
};
export const fetchCandidates = () => {
  return async dispatch => {
    try {
      dispatch(fetchCandidatesBegin());
      const resp = await fetch(BASE_URL + "api/users");
      const data = await resp.json();
      dispatch(fetchCandidatesSuccess(data));
    } catch (err) {
      console.log("ERROR: ", err);
      dispatch(fetchCandidatesFailure(err));
    }
  };
};
export const fetchJobs = () => {
  return async dispatch => {
    try {
      dispatch(fetchJobsBegin());
      const resp = await fetch(BASE_URL + "api/jobs");
      const data = await resp.json();
      console.log("DATA FROM FETCH JOBS: ", data);
      dispatch(fetchJobsSuccess(data));
    } catch (err) {
      console.log("ERROR: ", err);
      dispatch(fetchJobsFailure(err));
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
  const user_id = user.id
  return async dispatch => {
    try {
      dispatch(updateStatusBegin());
      const resp = await fetch(BASE_URL + "api/jobs/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ id: id, status: status, user_id: user_id })
      });
      dispatch(updateStatusSuccess(id, status, user_id));
    } catch (err) {
      console.log("ERROR: ", err);
      dispatch(updateStatusFailure(err));
    }
  };
};
