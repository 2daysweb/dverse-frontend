//--------------- BEGIN ACTION TYPES ------------------------//

const BASE_URL = "http://localhost:3000/";

export const FETCH_JOBS_BEGIN   = 'FETCH_JOBS_BEGIN';
export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
export const FETCH_JOBS_FAILURE = 'FETCH_JOBS_FAILURE';

export const fetchJobsSuccess = jobs => ({
  type: FETCH_JOBS_SUCCESS,
  payload: { jobs }
});

export const fetchJobsFailure = error => ({
  type: FETCH_JOBS_FAILURE,
  payload: { error }
});
export const TOGGLE_JOB_STATUS = "TOGGLE_JOB_STATUS";
export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_DRAFTED: "SHOW_DRAFTED",
  SHOW_SUBMITTED: "SHOW_SUBMITTED",
  SHOW_APPROVED: "SHOW_APPROVED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

//--------------- END ACTION TYPES ------------------------//

//--------------- BEGIN ACTION CREATORS ------------------------//

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

function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

export const fetchJobsBegin = () => {
  return {
    type: FETCH_JOBS_BEGIN
  };
};

export const setVisibilityFilter = filter => ({
  type: "SET_VISIBILITY_FILTER",
  filter
});

export const toggleJobStatus = id => ({
  type: "TOGGLE_JOB_STATUS",
  id
});

//---------------END ACTION CREATORS ------------------------//
