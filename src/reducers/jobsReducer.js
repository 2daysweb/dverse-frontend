import {
  FETCH_JOBS_BEGIN,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE
} from "../actions/index";

const initialState = {
  jobs: [],
  loading: false,
  error: null
};

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS_BEGIN:
      // Start fresh
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_JOBS_SUCCESS:
      // DONE: set loading "false".
      // replace jobs with the ones from the server
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs
      };
    case FETCH_JOBS_FAILURE:
      // Request failed, and done. So set loading to "false".
      // Save the error for potential display on UI
      // Since failed, no need to set the jobs, so set to empty array
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: []
      };

    default:
      return state;
  }
}
