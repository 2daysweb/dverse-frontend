//---------------------------- BEGIN ACTION TYPES ------------------------//


const BASE_URL = "https://dverse-staffing-backend.herokuapp.com/";

export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const FETCH_JOBS_BEGIN = "FETCH_JOBS_BEGIN";
export const FETCH_JOBS_SUCCESS = "FETCH_JOBS_SUCCESS";
export const FETCH_JOBS_FAILURE = "FETCH_JOBS_FAILURE";

export const FETCH_CANDIDATES_BEGIN = "FETCH_CANDIDATES_BEGIN";
export const FETCH_CANDIDATES_SUCCESS = "FETCH_CANDIDATES_SUCCESS";
export const FETCH_CANDIDATES_FAILURE = "FETCH_CANDIDATES_FAILURE";

export const UPDATE_LATEST_CLICK = "UPDATE_LATEST_CLICK";

//--------------- END ACTION TYPES ------------------------//

//--------------- BEGIN ACTION CREATORS ------------------------//

export function setCurrentUser(email, password) {
  return dispatch => {
    dispatch(loginBegin(email, password));
    fetch(BASE_URL + "api/v1/login", {
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
      .then(handleErrors)
      .then(resp => resp.json())
      .then(data => {
        if (data.authenticated) {
          dispatch(loginSuccess(data));
          return data;
        } else {
          alert("Incorrect username or password");
        }
      })
      .catch(e => loginFailure(e));
  };
}

export const loginBegin = (email, password) => ({
  type: "LOGIN_BEGIN",
  email: email,
  password: password
});

export const loginSuccess = data => {
  return {
    type: "LOGIN_SUCCESS",
    user: data.user,
    token: data.token
  };
};

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
  failure: true
});

export const logout = () => ({
  type: "LOGOUT"
});

export function fetchCandidates() {
  return dispatch => {
    dispatch(fetchCandidatesBegin());
    return fetch(BASE_URL + "api/v1/users")
      .then(handleErrors)
      .then(resp => resp.json())
      .then(users => {
        dispatch(fetchCandidatesSuccess(users));
        return users;
      })
      .catch(error => dispatch(fetchCandidatesFailure(error)));
  };
}

export const fetchCandidatesBegin = () => ({
  type: FETCH_CANDIDATES_BEGIN
});

export const fetchCandidatesSuccess = users => ({
  type: FETCH_CANDIDATES_SUCCESS,
  payload: { users }
});

export const fetchCandidatesFailure = error => ({
  type: FETCH_CANDIDATES_FAILURE,
  payload: { error }
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function fetchJobs() {
  return dispatch => {
    dispatch(fetchJobsBegin());
    return fetch(BASE_URL + "api/v1/jobs")
      .then(handleErrors)
      .then(resp => resp.json())
      .then(jobs => {
        dispatch(fetchJobsSuccess(jobs));
        return jobs;
      })
      .catch(error => dispatch(fetchJobsFailure(error)));
  };
}

export const fetchJobsBegin = () => ({
  type: FETCH_JOBS_BEGIN
});

export const fetchJobsSuccess = jobs => ({
  type: FETCH_JOBS_SUCCESS,
  payload: { jobs }
});

export const fetchJobsFailure = error => ({
  type: FETCH_JOBS_FAILURE,
  payload: { error }
});

export const updateLatestClick = latestClick => ({
  type: "UPDATE_LATEST_CLICK",
  payload: { latestClick }
});

export const toggleJobStatus = id => ({
  type: "TOGGLE_JOB_STATUS",
  id
});

//---------------------------------------------------------- END ACTION CREATORS ------------------------------------------------------------------------//
