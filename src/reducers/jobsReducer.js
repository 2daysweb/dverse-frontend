import {
  FETCH_JOBS_BEGIN,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
  DELETE_JOB_BEGIN,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILURE
} from "../actions/index";

const initialState = {
  latestClick: "",
  loading: false,
  error: null,
  jobs: []
};

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs
      };
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case CREATE_JOB_BEGIN:
      return { ...state, loading: true, error: null };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        latestClick: "",
        loading: false,
        error: null,
        jobs: [...state.jobs.slice(), action.payload.job]
      };

    case CREATE_JOB_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }
    case DELETE_JOB_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        jobs: state.jobs.filter(job => job.id !== action.payload.id)
      };
    case DELETE_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
