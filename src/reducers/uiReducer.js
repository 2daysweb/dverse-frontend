import {
  SELECT_CANDIDATE,
  SELECT_JOB,
  JOB_EDIT_BEGIN,
  JOB_EDIT_CANCEL
} from "../actions/index";

const initialState = {
  latestClick: "",
  selectedCandidate: null,
  selectedJob: null,
  body: "",
  title: ""
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_JOB:
      return {
        ...state,
        selectedJob: action.payload.job,
        latestClick: "Show"
      };
    case SELECT_CANDIDATE:
      return {
        ...state,
        selectedCandidate: action.payload.candidate,
        latestClick: "Show"
      };
    case JOB_EDIT_BEGIN:
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,
        latestClick: "Edit"
      };
    case JOB_EDIT_CANCEL:
      return {
        ...state,
        latestClick: "Show"
      };
    default:
      return state;
  }
};

export default uiReducer;
