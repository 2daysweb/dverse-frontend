import {
  CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_FAILURE,
  DELETE_JOB_BEGIN, DELETE_JOB_SUCCESS, DELETE_JOB_FAILURE,
  EDIT_JOB_BEGIN,EDIT_JOB_CANCEL,
  SAVE_JOB_BEGIN, SAVE_JOB_SUCCESS, SAVE_JOB_FAILURE,
  REQUEST_JOBS_BEGIN, REQUEST_JOBS_SUCCESS, REQUEST_JOBS_FAILURE,
  SELECT_JOB,
  UPDATE_STATUS_BEGIN, UPDATE_STATUS_SUCCESS, UPDATE_STATUS_FAILURE,
  VisibilityFilters
} from "../actions";

const initialState = {
  latestClick: "",
  loading: false,
  error: null,
  jobs: [],
  selectedJob: null,
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
        jobs: state.jobs.filter(job => job.id !== state.selectedJob.id),
        selectedJob:null
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
        latestClick: "Edit"
      };
      case EDIT_JOB_CANCEL:
        return {
          ...state,
          latestClick: ""
        };
    case SAVE_JOB_BEGIN:
      return {
        ...state,
        loading:true
      };
    case SAVE_JOB_SUCCESS:
      return {
        ...state,
        latestClick: "Show",
        loading:false
      };
      case SAVE_JOB_FAILURE:
        return {
          ...state,
          latestClick: "",
          loading:false
        };
    default:
      return state;
    case REQUEST_JOBS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case REQUEST_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs
      };
    case REQUEST_JOBS_FAILURE:
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
  console.log(jobs, filter)
  let user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.email
  debugger 
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
