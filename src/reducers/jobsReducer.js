import {
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
  DELETE_JOB_BEGIN,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILURE,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_CANCEL,
  FETCH_JOBS_BEGIN,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  SELECT_JOB,
  UPDATE_STATUS_BEGIN,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILURE,
  VisibilityFilters
} from "../actions";

const initialState = {
  latestClick: "",
  loading: false,
  error: null,
  jobs: [],
  selectedJob: null,
  body: "",
  title: ""
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
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
        latestClick: "",
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

    case EDIT_JOB_BEGIN:
      return {
        ...state,
        latestClick: "Edit",
        body: action.payload.body,
        title: action.payload.title
      };
    case EDIT_JOB_SUCCESS:
      return {
        state
      };
    case EDIT_JOB_CANCEL:
      return {
        ...state,
        latestClick: "Show"
      };
    default:
      return state;
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
    case SELECT_JOB:
      return {
        ...state,
        latestClick: "Show",
        selectedJob: action.payload.job
      };
    case UPDATE_STATUS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        latestClick: "Show",
        loading: false,
        error: null,
        jobs: state.jobs.map(job => {
          return job.id === action.payload.id
            ? { ...job, status: action.payload.status }
            : job;
        })
      };
    case UPDATE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
  }
};

export const getVisibleJobs = (jobs, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return jobs;
    case VisibilityFilters.SHOW_DRAFTED:
      return jobs.filter(j => j.status === "drafted");
    case VisibilityFilters.SHOW_SUBMITTED:
      return jobs.filter(j => j.status === "submitted");
    case VisibilityFilters.SHOW_APPROVED:
      return jobs.filter(j => j.status === "approved");
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

export default jobsReducer;
