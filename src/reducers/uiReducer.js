import { SELECT_JOB } from "../actions";
import { SELECT_CANDIDATE } from "../actions";

const initialState = {
  selectedJob: null,
  selectedCandidate: null,
  latestClick: ""
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
    default:
      return state;
  }
};

export default uiReducer;
